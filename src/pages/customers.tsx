import { Typography } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../app/hooks";
import {
  fetchCustomers,
  hideModal,
  selectCustomers,
  selectModal,
  selectPending,
  showModal,
  editCustomer,
  createCustomer,
  selectSelectedCustomer,
  filterCustomers,
} from "../features/customers/customerSlice";
import { Customer, Industry } from "../features/customers/interfaces";
import Actions from "./containers/actions";
import CustomersList from "./containers/customers-list";
import Modal from "./containers/modal";

const CustomersPage = () => {
  const dispatch = useAppDispatch();

  const pending = useSelector(selectPending);
  const customers = useSelector(selectCustomers);
  const customer = useSelector(selectSelectedCustomer);
  const modalType = useSelector(selectModal);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const onCreate = () => {
    dispatch(showModal({ type: "create" }));
  };

  const onModalOk = (customer: Customer) => {
    if (modalType === "create") {
      dispatch(createCustomer(customer));
    }

    if (modalType === "edit") {
      dispatch(editCustomer(customer));
    }
    dispatch(hideModal());
  };

  const onModalCancel = () => {
    dispatch(hideModal());
  };

  const onFilter = (industry: Industry) => {
    dispatch(filterCustomers(industry));
  };

  return (
    <div>
      <Typography.Title>Customer Overview</Typography.Title>
      <Actions onCreate={onCreate} onChangeFilter={onFilter} />
      <CustomersList pending={pending} customers={customers} />
      <Modal
        customer={customer}
        type={modalType}
        visible={!!modalType}
        onOk={onModalOk}
        onCancel={onModalCancel}
      />
    </div>
  );
};

export default CustomersPage;
