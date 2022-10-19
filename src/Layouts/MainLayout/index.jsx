import styles from "./MainLayout.module.scss";
import { Footer, Loader, Navbar } from "../../components";
import { GlobalContext } from "../../utils/context";
import { useContext } from "react";

const MainLayout = ({
  children,
  navbar = { isFirstTime: false },
  className,
}) => {
  const { loading } = useContext(GlobalContext);
  const { isFirstTime } = navbar;
  return (
    <div className={styles.container}>
      <Navbar isFirstTime={isFirstTime} />
      <main className={className}>{children}</main>
      {loading?.isLoading && <Loader />}
      <Footer />
    </div>
  );
};

export default MainLayout;
