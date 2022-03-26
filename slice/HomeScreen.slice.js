import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiService } from "../services/apiService";
import { API_ROUTES } from "../utils";

export const HOME_SCREEN_KEY = "homeScreen";

// otp Page Initial State
export const initialHomePageState = {
  transactionList: [],
  errorMessage: "",
  loading: false,
};

export const homePageSlice = createSlice({
  name: HOME_SCREEN_KEY,
  initialState: initialHomePageState,
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

// home page reducer
export const homePageReducer = homePageSlice.reducer;

// home page actions
export const { setErrorMessage, setLoading, setTransactionList } = homePageSlice.actions;

/*
name: getTransactionList
*/
export function getTransactionList(payload) {
  console.log("inside slice", payload,);

  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const data = await ApiService.getApi("/transactions/6c3a24b3-e795-4ef6-a027-179afc10532d");
      console.log(data.data)
      dispatch(setTransactionList(data.data.list));
    } catch (err) {
      dispatch(setErrorMessage(err.message || "Something went wrong"));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export const getHomePageState = (rootState) => rootState[HOME_SCREEN_KEY];

export const selectErrorMessage = createSelector(
  getHomePageState,
  (subState) => subState.errorMessage
);

export const selectSuccessMessage = createSelector(
  getHomePageState,
  (subState) => subState.successMessage
);

export const selectLoading = createSelector(
  getHomePageState,
  (subState) => subState.loading
);

export const selectTransactionList = createSelector(
  getHomePageState,
  (subState) => subState.transactionList
);
