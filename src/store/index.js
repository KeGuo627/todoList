import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "../reducer/index";

export const store = configureStore({ reducer: reducer });
//wrap all the components in the app to the store
