import styles from "./Navbar.module.scss";
import { Logo } from "../";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { icons } from "../../assets";
import { IconButton } from "../";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const { instagram, twitter, discord } = icons;

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

const socials = [
  // {
  //   name: "Instagram",
  //   icon: instagram,
  //   href: "https://www.youtube.com/",
  // },
  {
    name: "Discord",
    icon: discord,
    href: "https://www.youtube.com/",
  },
  {
    name: "Twitter",
    icon: twitter,
    href: "https://www.youtube.com/",
  },
];

const Navbar = ({ isFirstTime }) => {
  const navigate = useNavigate();
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
            {navLinks.map((link) => (
              <NavLink
                end
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
        )}
        {isFirstTime || (
          <div className={styles.social}>
            {socials.map((social) => (
              <IconButton
                icon={social?.icon}
                href={social?.href}
                target="blank"
              />
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
