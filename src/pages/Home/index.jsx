import { MainLayout } from "../../Layouts";
import styles from "./Home.module.scss";
import { Logo, Button, IconButton } from "../../components";
import { icons } from "../../assets";

const { redirect, instagram } = icons;

const index = () => {
  return (
    <MainLayout>
      <section className={styles.container}>
        <div className={styles.maxWidthContainer}>Home</div>
      </section>
    </MainLayout>
  );
};

export default index;
