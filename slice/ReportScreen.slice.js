import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiService } from "../services/apiService";
import { API_ROUTES } from "../utils";

export const REPORT_SCREEN_KEY = "reportScreen";

// report Page Initial State
export const initialReportPageState = {
  expenseList: [],
  errorMessage: "",
  loading: false,
};

export const reportPageSlice = createSlice({
  name: REPORT_SCREEN_KEY,
  initialState: initialReportPageState,
  reducers: {
    setExpenseList: (state, action) => {
      state.expenseList = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// report page reducer
export const ReportPageReducer = reportPageSlice.reducer;

// report page actions
export const { setErrorMessage, setLoading, setExpenseList } = reportPageSlice.actions;

/*
name: getExpenseList
*/
export function getExpenseList(payload) {
  console.log("inside report slice", payload,);
  const url = `/transactions/6c3a24b3-e795-4ef6-a027-179afc10532d/categories?month=${payload.month}`

  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const {data} = await ApiService.getApi(url);
      dispatch(setExpenseList(data));
    } catch (err) {
      dispatch(setErrorMessage(err.message || "Something went wrong"));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export const getReportPageState = (rootState) => rootState[REPORT_SCREEN_KEY];

export const selectErrorMessage = createSelector(
  getReportPageState,
  (subState) => subState.errorMessage
);

export const selectSuccessMessage = createSelector(
  getReportPageState,
  (subState) => subState.successMessage
);

export const selectLoading = createSelector(
  getReportPageState,
  (subState) => subState.loading
);

export const selectExpenseList = createSelector(
  getReportPageState,
  (subState) => subState.expenseList
);
