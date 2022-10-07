import styles from "./MainLayout.module.scss";
import { Loader, Navbar } from "../../components";
import { GlobalContext } from "../../utils/context";
import { useContext } from "react";

const MainLayout = ({
  children,
  navbar = { isFirstTime: false },
  className,
}) => {
  const { isLoading } = useContext(GlobalContext);
  const { isFirstTime } = navbar;
  return (
    <div className={styles.container}>
      <Navbar isFirstTime={isFirstTime} />
      <main className={className}>{children}</main>
      {isLoading && <Loader />}
    </div>
  );
};

export default MainLayout;
