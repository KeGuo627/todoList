import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { reducer } from "../reducer/index";

/*export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: thunk }),
});*/
export const store = createStore(reducer, applyMiddleware(thunk));
//wrap all the components in the app in the store
