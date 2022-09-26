import styles from "./Logo.module.scss";
import { images } from "../../assets";

const { logo } = images;

const index = ({ width }) => {
  return (
    <div className={styles.container}>
      <img width={width} src={logo} alt="Logo" />
    </div>
  );
};

export default index;
