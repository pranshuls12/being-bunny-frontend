import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../utils/context";
import styles from "./Loader.module.scss";

const Loading = ({ time = 1000 }) => {
  const { isLoading, setIsLoading } = useContext(GlobalContext);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    handleLoaderWidth();
  });

  function handleLoaderWidth() {
    if (width < 100) {
      setTimeout(() => {
        setWidth(width + 1);
      }, time / 100);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.center}>
        <h3>HOLD YOUR BUNNIES 🐇</h3>
        <div className={styles.progressBarContainer}>
          <div
            style={{ width: width + "%" }}
            className={styles.progressBar}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
