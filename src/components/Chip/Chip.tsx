import React from 'react';
import styles from './Chip.module.scss'
import { useGenerateId } from '@/shared/hooks/useGenerateId';
import Props from './types';

const Chip = ({ 
  label, 
  className, 
  size = "medium", 
  icon: Icon,
  iconSize, 
  image, 
  color, 
}: Props) => {
  const id = useGenerateId(6);
  return (
    <div 
      id={id} 
      className={`${styles.Chip} ${className || ''} ${styles[size]}`}
      style={{ backgroundColor: `${color && color}` }}
    >
      <span className={styles.ChipContent}>
        {Icon && (
          <span className={`${styles.ChipIcon}`} style={{ fontSize: `${iconSize}px` }}><Icon /></span>
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