import React from "react";
import { MainLayout } from "../../Layouts";
import styles from "./OG.module.scss";
import { images, icons } from "../../assets";
import clsx from "clsx";

const { og1, og2, og3, og4 } = images;
const { mouse } = icons;

const index = () => {
  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.centralHeading}>
          <h1 className={styles.ourOGS}>
            OUR <span className={styles.yellowText}>OG's</span>{" "}
          </h1>
          <img src={mouse} alt="Scroll" />
          <span>Scroll</span>
        </div>
        <section
          style={{ background: "url(" + og1 + ") no-repeat center" }}
          className={styles.og}
        ></section>
        <section
          style={{ background: "url(" + og2 + ") no-repeat center" }}
          className={styles.og}
        ></section>
        <section
          style={{ background: "url(" + og3 + ") no-repeat center" }}
          className={styles.og}
        ></section>
        <section
          style={{ background: "url(" + og4 + ") no-repeat center" }}
          className={styles.og}
        ></section>
      </div>
    </MainLayout>
  );
};

export default index;
