import styles from "./MainLayout.module.scss";
import { Navbar } from "../../components";

const index = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default index;
