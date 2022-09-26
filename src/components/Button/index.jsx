import styles from "./Button.module.scss";
import clsx from "clsx";

const index = ({
  type,
  variant,
  leftIcon,
  rightIcon,
  children,
  className,
  onClick,
}) => {
  function getVariantStyles() {
    switch (variant) {
      case "primary":
        return styles.primary;
      case "secondary":
        return styles.secondary;
      case "tertiary":
        return styles.tertiary;
      default:
        return styles.primary;
    }
  }
  return (
    <button
      onClick={onClick}
      className={clsx(
        styles.button,
        getVariantStyles(),
        className ? [...className] : ""
      )}
      type={type || "button"}
    >
      {leftIcon && (
        <img className={styles.leftIcon} src={leftIcon} alt="Left Icon" />
      )}
      {children}
      {rightIcon && (
        <img className={styles.rightIcon} src={rightIcon} alt="Right Icon" />
      )}
    </button>
  );
};

export default index;

export const IconButton = ({ type, icon, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.iconButton, className ? [...className] : "")}
      type="button"
    >
      <img className={styles.icon} src={icon} alt="Icon" />
    </button>
  );
};
