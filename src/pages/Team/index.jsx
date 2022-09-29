import { MainLayout } from "../../Layouts";
import styles from "./Team.module.scss";

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
