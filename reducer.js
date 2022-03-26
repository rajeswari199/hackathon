import { combineReducers } from "@reduxjs/toolkit";

import {
  homePageReducer,
  HOME_SCREEN_KEY,
} from "./slice/HomeScreen.slice";

export const reducer = () => {
  return combineReducers({
    [HOME_SCREEN_KEY]: homePageReducer,
  });
};

const rootReducer = reducer();