import { ReactNode } from "react";
import { Card, Layout, Typography } from "antd";

import styles from "./styles/layout.module.scss";

const { Header, Content, Footer } = Layout;

interface Props {
  children: ReactNode;
}

const AppLayout = ({ children }: Props) => (
  <Layout className={styles.layout}>
    <Header className={styles.header}>
      <Typography.Title className={styles.title} level={3}>
        🐛🐞🪲
      </Typography.Title>
      <Typography.Title className={styles.title} level={3}>
        Quality Engineering Challenge
      </Typography.Title>
    </Header>
    <Content className={styles.content}>
      <Card className={styles.card}>{children}</Card>
    </Content>
    <Footer className={styles.footer}>
      <Typography.Text code>Have Fun !!!</Typography.Text>
    </Footer>
  </Layout>
);

export default AppLayout;
