import { MainLayout } from "../../Layouts";
import styles from "./Home.module.scss";
import { Logo, Button, IconButton } from "../../components";
import { icons } from "../../assets";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../utils/context";
import clsx from "clsx";

const { redirect, instagram } = icons;

const Home = () => {
  const { isFirstTime, setIsFirstTime, isLoading } = useContext(GlobalContext);
  // useEffect(() => {
  //   console.log({ isFirstTime });
  // });
  return (
    <MainLayout navbar={{ isFirstTime }}>
      <section
        className={
          isFirstTime
            ? clsx(styles.container, styles.firstTime)
            : styles.container
        }
      >
        <div className={styles.maxWidthContainer}>
          {isFirstTime && !isLoading && (
            <h1
              onClick={() => {
                setIsFirstTime(false);
              }}
              className={styles.firstTimeHeading}
            >
              ENTER THE{" "}
              <span style={{ fontSize: "unset" }} className={styles.yellowText}>
                BUNNY HOUSE
              </span>{" "}
            </h1>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
