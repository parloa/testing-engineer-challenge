import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { Pending } from "../../data/interfaces";
import { RootState } from "../../data/store";
import { getCustomers } from "./customer-api";
import { Customer } from "./interfaces";

export type ModalType = "create" | "edit";

export interface CustomerState {
  error?: SerializedError;
  pending: Pending;
  customers: Customer[];
  filteredCustomers: Customer[];
  selectedCustomer?: Customer;
  modal?: ModalType;
}

const initialState: CustomerState = {
  pending: Pending.idle,
  customers: [],
  filteredCustomers: [],
  selectedCustomer: undefined,
  error: undefined,
  modal: undefined,
};

export const fetchCustomers = createAsyncThunk("customers/fetch", async () => {
  const response = await getCustomers();

  return response;
});

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    showModal: (
      state,
      action: PayloadAction<{ type: "edit" | "create"; customer?: Customer }>
    ) => {
      state.modal = action.payload.type;
      state.selectedCustomer = action.payload.customer;
    },
    hideModal: (state) => {
      state.modal = undefined;
      state.selectedCustomer = undefined;
    },
    createCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload);

      state.filteredCustomers.push(action.payload);
    },
    editCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers = state.customers.map((customer) => {
        if (customer.id !== action.payload.id) {
          return customer;
        }

        return action.payload;
      });

      state.filteredCustomers = state.filteredCustomers.map((customer) => {
        if (customer.id !== action.payload.id) {
          return customer;
        }

        return action.payload;
      });
    },
    deleteCustomer: (state, action: PayloadAction<{ id: string }>) => {
      state.filteredCustomers = state.filteredCustomers.filter(
        ({ id }) => id !== action.payload.id
      );
    },
    filterCustomers: (
      state,
      action: PayloadAction<Customer["industry"] | "all">
    ) => {
      if (action.payload !== "all") {
        state.filteredCustomers = state.customers.filter(
          ({ industry }) => industry === action.payload
        );
      } else {
        state.filteredCustomers = state.customers;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.pending = Pending.loading;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.pending = Pending.idle;
        state.customers = action.payload;
        state.filteredCustomers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.pending = Pending.idle;
        state.error = action.error;
      });
  },
});

export const {
  createCustomer,
  editCustomer,
  deleteCustomer,
  filterCustomers,
  hideModal,
  showModal,
} = customerSlice.actions;

// Selectors
export const selectCustomers = (state: RootState) =>
  state.customers.filteredCustomers;
export const selectSelectedCustomer = (state: RootState) =>
  state.customers.selectedCustomer;
export const selectPending = (state: RootState) => state.customers.pending;
export const selectModal = (state: RootState) => state.customers.modal;
export const selectError = (state: RootState) => state.customers.error;

export default customerSlice.reducer;
