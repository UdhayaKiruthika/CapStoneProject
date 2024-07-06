import { Tuple, combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import productReducer from "./slices/productSlice";
import productsReducer from "./slices/productsSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";

const reducer = combineReducers({
  productsState: productsReducer,
  productState: productReducer,
  authState: authReducer,
  cartState: cartReducer,
});
const store = configureStore({
  reducer,
  middleware: () => new Tuple(thunk),
});
export default store;
