import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { AsyncStorage } from "react-native";
import { ApiService } from "../services/apiService";
import { API_ROUTES } from "../utils";

export const LOGIN_SCREEN_KEY = "loginScreen";

// otp Page Initial State
export const initialLoginPageState = {
  transactionList: [],
  errorMessage: "",
  loading: false,
};

export const LoginPageSlice = createSlice({
  name: LOGIN_SCREEN_KEY,
  initialState: initialLoginPageState,
  reducers: {
    setTransactionList: (state, action) => {
      state.transactionList = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Login page reducer
export const LoginPageReducer = LoginPageSlice.reducer;

// Login page actions
export const {
  setErrorMessage,
  setLoading,
  setTransactionList,
} = LoginPageSlice.actions;

/*
name: getTransactionList
*/
export function sendSmsData(payload) {
  console.log("inside sendSmsData slice", payload);

  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const user = await AsyncStorage.getItem("userDetails");
      const { data } = await ApiService.postApi("/transactions/create", {
        message: payload.body,
        userId: JSON.parse(user).userPoolId,
      });
      console.log(data);
    } catch (err) {
      dispatch(setErrorMessage(err.message || "Something went wrong"));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function registerUser(callBack) {
  console.log("inside registerUser slice");

  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const user = await AsyncStorage.getItem("userDetails");
      console.log(JSON.parse(user));
      const data = await ApiService.postApi(`/user/${JSON.parse(user).userPoolId}`);
      console.log(data);
      callBack();
    } catch (err) {
      dispatch(setErrorMessage(err.message || "Something went wrong"));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export const getLoginPageState = (rootState) => rootState[LOGIN_SCREEN_KEY];

export const selectErrorMessage = createSelector(
  getLoginPageState,
  (subState) => subState.errorMessage
);

export const selectSuccessMessage = createSelector(
  getLoginPageState,
  (subState) => subState.successMessage
);

export const selectLoading = createSelector(
  getLoginPageState,
  (subState) => subState.loading
);

export const selectTransactionList = createSelector(
  getLoginPageState,
  (subState) => subState.transactionList
);
