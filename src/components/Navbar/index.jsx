import styles from "./Navbar.module.scss";
import { Logo } from "../";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const navLinks = [
  {
    name: "OG",
    to: "/og",
  },
  // {
  //   name: "Home",
  //   to: "/",
  // },
  {
    name: "Team",
    to: "/team",
  },
  {
    name: "Minting",
    to: "/minting",
  },
];

const index = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.maxWidthContainer}>
        <div className={styles.logo}>
          <Logo />
          <h3>BEING BUNNY</h3>
        </div>
        <div className={styles.navLinks}>
          {navLinks.map((link) => (
            <NavLink
              exact
              className={(isActive) => {
                console.log(isActive);
                return clsx(
                  styles.navLink,
                  isActive.isActive ? styles.active : styles.inactive
                );
              }}
              to={link.to}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default index;
