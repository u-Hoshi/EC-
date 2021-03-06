import {
  signInAction,
  signOutAction,
  fetchProductsInCartAction,
  fetchProductsInFavoriteAction,
  fetchOrdersHistoryAction,
} from './actions';
import { push } from 'connected-react-router';
import { auth, FirebaseTimestamp, db } from '../../firebase/index';
import { isWidthUp } from '@material-ui/core';
import { AddRounded } from '@material-ui/icons';

const usersRef = db.collection('users');

export const addProductToCart = (addedProduct) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const cartRef = usersRef.doc(uid).collection('cart').doc();
    addedProduct['cartId'] = cartRef.id;
    await cartRef.set(addedProduct);
    dispatch(push('/'));
  };
};

export const addProductToFavorite = (addedFavProduct) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const FavRef = usersRef.doc(uid).collection('favorite').doc();
    addedFavProduct['favId'] = FavRef.id;
    await FavRef.set(addedFavProduct);
    dispatch(push('/'));
  };
};

export const fetchOrdersHistory = () => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const list = [];

    usersRef
      .doc(uid)
      .collection('orders')
      .orderBy('updated_at', 'desc')
      .get()
      .then((snapshot) => {
        snapshot.forEach((snapshot) => {
          const data = snapshot.data();
          list.push(data);
        });
        dispatch(fetchOrdersHistoryAction(list));
      });
  };
};

export const fetchProductsInCart = (products) => {
  return async (dispatch) => {
    dispatch(fetchProductsInCartAction(products));
  };
};

export const fetchProductsInFavorite = (products) => {
  return async (dispatch) => {
    dispatch(fetchProductsInFavoriteAction(products));
  };
};

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        db.collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );
          });
      } else {
        dispatch(push('/signin'));
      }
    });
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === '') {
      alert('??????????????????????????????');
      return false;
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          alert('?????????????????????????????????????????????????????????');
          dispatch(push('/signin'));
        })
        .catch(() => {
          alert('???????????????????????????????????????????????????');
        });
    }
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    if (email === '' || password === '') {
      alert('??????????????????????????????');
      return false;
    }

    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;
      if (user) {
        const uid = user.uid;

        db.collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();
            dispatch(
              signInAction({
                isSignIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );
            dispatch(push('/'));
          });
      }
    });
  };
};

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    if (
      username === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      alert('??????????????????????????????');
      return false;
    }
    if (password !== confirmPassword) {
      alert('????????????????????????????????????');
      return false;
    }
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: 'customer',
            uid: uid,
            update_at: timestamp,
            username: username,
          };

          db.collection('users')
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              dispatch(push('/'));
            });
        }
      });
  };
};

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push('/signin'));
    });
  };
};
