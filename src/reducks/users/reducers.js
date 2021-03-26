import * as Action from './actions';
import initialState from '../store/initialState';

export const UsersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case Action.FETCH_PRODUCTS_IN_CART:
      return {
        ...state,
        cart: [...action.payload],
      };
    case Action.SIGN_IN:
      return {
        ...state,
        ...action.payload,
      };
    case Action.SIGN_OUT:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default initialState;
