import React, { useEffect } from 'react';
import styles from './Chip.module.scss'
import Image from 'next/image';

interface Props {
  label: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  image?: string;
}

const Chip = ({ label, className, size = "medium", icon, iconPosition = "left", iconSize, image }: Props) => {
  return (
    <div className={`${styles.Chip} ${className || ''} ${styles[size]}`}>
      <span>
        {icon && (
          <span className={`${styles.ChipIcon} ${styles[iconPosition]}`} style={{ fontSize: `${iconSize}px` }}>{icon}</span>
        )}
        {image && (
          <img src={image} width={iconSize} height={iconSize} alt={label} className={`${styles.ChipImage} ${styles[iconPosition]}`} />
        )}
        {label}
      </span>
    </div>
  )
}

export default Chip