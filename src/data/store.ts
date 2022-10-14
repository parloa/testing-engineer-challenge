import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import customersReducer from "../features/customers/customerSlice";

export const store = configureStore({
  reducer: {
    customers: customersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
