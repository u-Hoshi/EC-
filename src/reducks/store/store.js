import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import { ProductsReducer } from '../products/reducers';
import { UsersReducer } from '../users/reducers';

export default function createStore(history) {
  // console.log(history);
  return reduxCreateStore(
    combineReducers({
      // loading: LoadingReducer,
      products: ProductsReducer,
      router: connectRouter(history),
      users: UsersReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  );
}
