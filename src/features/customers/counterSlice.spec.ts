import { Pending } from "../../data/interfaces";
import customerReducer, { CustomerState } from "./customerSlice";

describe("counter reducer", () => {
  const initialState: CustomerState = {
    customers: [],
    filteredCustomers: [],
    pending: Pending.idle,
    error: undefined,
    modal: undefined,
    selectedCustomer: undefined,
  };
  it("should handle initial state", () => {
    expect(customerReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  //   it("should handle increment", () => {
  //     const actual = customerReducer(initialState, increment());
  //     expect(actual.value).toEqual(4);
  //   });

  //   it("should handle decrement", () => {
  //     const actual = customerReducer(initialState, decrement());
  //     expect(actual.value).toEqual(2);
  //   });

  //   it("should handle incrementByAmount", () => {
  //     const actual = customerReducer(initialState, incrementByAmount(2));
  //     expect(actual.value).toEqual(5);
  //   });
});
