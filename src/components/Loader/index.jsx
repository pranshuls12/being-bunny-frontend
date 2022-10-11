import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../utils/context";
import styles from "./Loader.module.scss";

const Loading = ({ time = 1000 }) => {
  const { loading, setLoading } = useContext(GlobalContext);

  useEffect(() => {
    // handleLoaderWidth();
  });

  // function handleLoaderWidth() {
  //   if (loading?.width < 60) {
  //     setTimeout(() => {
  //       setLoading((prev) => ({ ...prev, width: prev.width + 1 }));
  //     }, time / 100);
  //   }
  // }

  useEffect(() => {
    console.log(loading?.width);
  });

  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <h3>HOLD YOUR BUNNIES 🐇</h3>
        <div className={styles.progressBarContainer}>
          <div
            style={{ width: loading?.width + "%", transition: "all 2s" }}
            className={styles.progressBar}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
