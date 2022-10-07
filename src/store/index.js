import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer } from "../reducer/index";

export const store = createStore(reducer, applyMiddleware(thunk));
//wrap all the components in the app in the store
