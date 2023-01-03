import { createSlice } from "@reduxjs/toolkit";

// export interface NotificationState {
//   open?: boolean;
//   color?: string;
//   message?: string;
//   timeout?: number | null;
// }

export const alertInitialState = {
  open: false,
  color: "",
  message: "",
  timeout: 0
};

export const alertSlice = createSlice({
  name: "alert",
  initialState: alertInitialState,
  reducers: {
    addAlert: (_state, action) => ({
      ...alertInitialState,
      ...action.payload,
      open: true
    }),
    clearAlert: (state) => ({ ...state, open: false, message: "", color: "", timeout: 0 })
  }
});

export const alertActions = alertSlice.actions;
export const alertReducer = alertSlice.reducer;