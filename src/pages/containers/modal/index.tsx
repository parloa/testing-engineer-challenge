import {
  Form,
  Input,
  Modal as AntModal,
  ModalProps,
  Select,
  Switch,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";

import { ModalType } from "../../../features/customers/customerSlice";
import { Customer, Industry } from "../../../features/customers/interfaces";

interface Props extends Omit<ModalProps, "onOk"> {
  type: ModalType | undefined;
  customer: Customer | undefined;
  onOk(customer: Customer): void;
}
const Modal = ({ type, customer, ...props }: Props) => {
  const [form] = useForm<Customer>();

  useEffect(() => {
    if (customer) {
      form.setFieldsValue(customer);
    }
  }, [customer, form]);

  const onOk = () => {
    props.onOk({
      ...customer,
      ...form.getFieldsValue(),
      about: customer?.about ?? "",
    });
  };

  return (
    <AntModal {...props} onOk={onOk} onCancel={onOk}>
      <Form form={form}>
        <Form.Item label="Company" name="company">
          <Input />
        </Form.Item>
        <Form.Item label="Industry" name="industry">
          <Select>
            {["all", ...Object.values(Industry)].map((industry) => (
              <Select.Option key={industry}>{industry}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Is Active" name="isActive" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Description" name="about">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </AntModal>
  );
};

export default Modal;
