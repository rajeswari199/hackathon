import { combineReducers } from "@reduxjs/toolkit";

import {
  homePageReducer,
  HOME_SCREEN_KEY,
} from "./slice/HomeScreen.slice";

import {
  LoginPageReducer,
  LOGIN_SCREEN_KEY,
} from "./slice/LoginScreen.slice";

export const reducer = () => {
  return combineReducers({
    [HOME_SCREEN_KEY]: homePageReducer,
    [LOGIN_SCREEN_KEY]: LoginPageReducer,
  });
};

const rootReducer = reducer();