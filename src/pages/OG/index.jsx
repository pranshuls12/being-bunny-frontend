import React from "react";
import { MainLayout } from "../../Layouts";
import styles from "./OG.module.scss";

const index = () => {
  return (
    <MainLayout>
      <section className={styles.container}>OG Name</section>
    </MainLayout>
  );
};

export default index;
