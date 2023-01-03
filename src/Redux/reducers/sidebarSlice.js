import { createSlice } from "@reduxjs/toolkit";

// export interface NotificationState {
//   open?: boolean;
//   color?: string;
//   message?: string;
//   timeout?: number | null;
// }

export const sidebarState = {
  active: true,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: sidebarState,
  reducers: {
    toggleSidebar: (state) => { state.active = !state.active }
  }
});

export const sidebarActions = sidebarSlice.actions;
export const sidebarReducer = sidebarSlice.reducer;