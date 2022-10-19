import styles from "./Navbar.module.scss";
import { Logo } from "../";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { icons } from "../../assets";
import { IconButton } from "../";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../utils/context";

const navLinks = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "OG",
    to: "/og",
  },

  {
    name: "Team",
    to: "/team",
  },
  {
    name: "Minting",
    to: "/minting",
  },
];

const Navbar = ({ isFirstTime }) => {
  const navigate = useNavigate();
  const { slideNo, setSlideNo } = useContext(GlobalContext);
  return (
    <nav className={styles.container}>
      <div
        style={
          isFirstTime ? { backdropFilter: "none", background: "unset" } : {}
        }
        className={styles.maxWidthContainer}
      >
        <div
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
          className={styles.logo}
        >
          <Logo />
          <h3>BEING BUNNY</h3>
        </div>
        {isFirstTime || (
          <div className={styles.navLinks}>
            {navLinks.map((link, index) => (
              <p
                end
                onClick={() => setSlideNo(index + 1)}
                className={clsx(
                  styles.navLink,
                  index == slideNo - 1 ? styles.active : styles.inactive
                )}
                to={link.to}
              >
                {link.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
