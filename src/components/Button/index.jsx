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
      className={clsx(styles.button, getVariantStyles(), ...className)}
      type={type || "button"}
    >
      {rightIcon && <span>{rightIcon}</span>}
      {children}
      {leftIcon && <span>{leftIcon}</span>}
    </button>
  );
};

export default index;

export const IconButton = ({ type, children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.iconButton, ...className)}
      type="button"
    >
      {children}
    </button>
  );
};
