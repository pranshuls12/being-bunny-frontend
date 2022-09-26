import { MainLayout } from "../../Layouts";
import styles from "./Home.module.scss";
import { Logo } from "../../components";

const index = () => {
  return (
    <MainLayout>
      <section className={styles.container}>
        <div className={styles.maxWidthContainer}>
          <Logo />
        </div>
      </section>
    </MainLayout>
  );
};

export default index;
