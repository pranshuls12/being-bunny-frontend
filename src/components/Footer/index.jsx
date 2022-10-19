import clsx from "clsx";
import { useContext } from "react";
import { GlobalContext } from "../../utils/context";
import { IconButton } from "../Button";
import styles from "./Footer.module.scss";
import { icons } from "../../assets";

const { instagram, twitter, discord } = icons;

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
const Footer = () => {
  const { slideNo, isFirstTime } = useContext(GlobalContext);

  return (
    <div className={styles.container}>
      {isFirstTime || (
        <div className={styles.maxWidthContainer}>
          <div className={styles.progress}>
            <div
              className={styles.progressBar}
              style={{ width: `${slideNo * 25}%` }}
            ></div>
          </div>
          <div className={styles.social}>
            {socials.map((social, index) => (
              <IconButton
                key={index}
                icon={social?.icon}
                href={social?.href}
                target="blank"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
