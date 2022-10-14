import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import React from "react";
import { Industry } from "../../../features/customers/interfaces";

import styles from "./actions.module.scss";

interface Props {
  onCreate(): void;
  onChangeFilter(selectedFilter: Industry | "all"): void;
}

const Actions = ({ onCreate, onChangeFilter }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Select
        suffixIcon={<FilterOutlined />}
        defaultValue={"all"}
        className={styles.select}
        onChange={onChangeFilter}
      >
        {["all", ...Object.values(Industry)].map((industry) => (
          <Select.Option className={styles.option} key={industry}>
            {industry}
          </Select.Option>
        ))}
      </Select>
      <Button type="primary" onClick={onCreate} icon={<PlusOutlined />}>
        Create
      </Button>
    </div>
  );
};

export default Actions;
