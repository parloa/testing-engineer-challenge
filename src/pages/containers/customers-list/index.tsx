import { Skeleton } from "antd";
import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { Pending } from "../../../data/interfaces";
import {
  deleteCustomer,
  showModal,
} from "../../../features/customers/customerSlice";
import { Customer as ICustomer } from "../../../features/customers/interfaces";
import Customer from "./components/customer";

interface Props {
  customers: ICustomer[];
  pending: Pending;
}
const CustomersList = ({ customers, pending }: Props) => {
  const dispatch = useAppDispatch();

  const onDelete = (id: string) => {
    dispatch(deleteCustomer({ id }));
  };

  const onEdit = (id: string) => {
    dispatch(
      showModal({
        type: "edit",
        customer: customers.find((customer) => customer.id === id),
      })
    );
  };

  const onClick = (id: string) => {
    console.log(`customer with ${id} was clicked`);
  };

  return pending !== Pending.idle ? (
    <Skeleton />
  ) : (
    <>
      {customers.map((customer) => (
        <Customer
          {...customer}
          key={customer.id}
          onEdit={onEdit}
          onDelete={onDelete}
          onClick={onClick}
        />
      ))}
    </>
  );
};

export default CustomersList;
