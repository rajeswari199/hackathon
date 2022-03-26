import { combineReducers } from "@reduxjs/toolkit";

import {
  homePageReducer,
  HOME_SCREEN_KEY,
} from "./slice/HomeScreen.slice";

import {
  LoginPageReducer,
  LOGIN_SCREEN_KEY,
} from "./slice/LoginScreen.slice";

import {
  ReportPageReducer,
  REPORT_SCREEN_KEY,
} from "./slice/ReportScreen.slice";

export const reducer = () => {
  return combineReducers({
    [HOME_SCREEN_KEY]: homePageReducer,
    [LOGIN_SCREEN_KEY]: LoginPageReducer,
    [REPORT_SCREEN_KEY]: ReportPageReducer
  });
};

const rootReducer = reducer();