import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Divider, Tag, Typography } from "antd";

import {
  Customer as ICustomer,
  Industry,
} from "../../../../features/customers/interfaces";
import styles from "./customer.module.scss";

interface Props extends ICustomer {
  onEdit(id: string): void;
  onDelete(id: string): void;
  onClick(id: string): void;
}

const getPresetColorForIndustry = (industry: Industry) => {
  switch (industry) {
    case Industry.finance:
      return "gold";
    case Industry.insurance:
      return "magenta";
    case Industry.marketing:
      return "cyan";
    case Industry.tech:
      return "lime";
    case Industry.travel:
      return "geekblue";
    default:
      return "purple";
  }
};

const Customer = ({ onClick, onDelete, onEdit, ...customer }: Props) => (
  <Card className={styles.card}>
    <div className={styles["company-info"]}>
      <div>
        <Typography.Text strong>{customer.company}</Typography.Text>
        {"  "}
        <EditOutlined onClick={() => onEdit(customer.id)} />
        {"  "}
        <DeleteOutlined onClick={() => onDelete(customer.id)} />
      </div>
      <Tag
        color={getPresetColorForIndustry(customer.industry)}
        className={styles.tag}
      >
        {customer.industry}
      </Tag>
    </div>
    <Divider />
    <Typography.Text>Description: </Typography.Text>
    <br />
    <br />
    <Typography.Text className={styles.about} italic>
      {customer.about}
    </Typography.Text>
  </Card>
);

export default Customer;
