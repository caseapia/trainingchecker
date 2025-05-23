import React, { useId } from "react";
import styles from "./Chip.module.scss"
import Props from "./types";

const Chip = ({
  label,
  className,
  size = "medium",
  icon: Icon,
  iconSize,
  image,
  color,
}: Props) => {
  const id = useId();
  return (
    <div
      id={id}
      className={`${styles.Chip} ${className || ""} ${styles[size]}`}
      style={{ backgroundColor: `${color && color}` }}
    >
      <span className={styles.ChipContent}>
        {Icon && (
          <span className={`${styles.ChipIcon}`} style={{ fontSize: `${iconSize}px` }}><Icon/></span>
        )}
        {image && (
          <img src={image} width={iconSize} height={iconSize} alt={label} className={`${styles.ChipImage}`}/>
        )}
        {label}
      </span>
    </div>
  )
}

export default Chip