import { createSlice } from "@reduxjs/toolkit";

// export interface NotificationState {
//   open?: boolean;
//   color?: string;
//   message?: string;
//   timeout?: number | null;
// }

export const modalState = {
  open: false,
  message: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState: modalState,
  reducers: {
    showModal: (_state, action) => ({
      ...modalState,
      ...action.payload,
      open: true
    }),
    hideModal: (state) => ({ ...state, open: false, message: ""})
  }
});

export const modalActions = modalSlice.actions;
export const modalReducer = modalSlice.reducer;