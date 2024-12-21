import React from 'react';
import styles from './Chip.module.scss'
import { useGenerateId } from '@/shared/hooks/useGenerateId';

const Chip = ({ label, className, size = "medium", icon, iconPosition = "left", iconSize, image, color, }: Props) => {
  const id = useGenerateId();
  return (
    <div 
      id={id} 
      className={`${styles.Chip} ${className || ''} ${styles[size]}`}
      style={{ backgroundColor: `${color && color}` }}
    >
      <span className={styles.ChipContent}>
        {icon && (
          <span className={`${styles.ChipIcon}`} style={{ fontSize: `${iconSize}px` }}>{icon}</span>
        )}
        {image && (
          <img src={image} width={iconSize} height={iconSize} alt={label} className={`${styles.ChipImage}`} />
        )}
        {label}
      </span>
    </div>
  )
}

export default Chip