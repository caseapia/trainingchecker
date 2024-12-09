import { forwardRef } from 'react';
import styles from './Button.module.scss';
import { motion } from "framer-motion";
import Props from './types';
import { useGenerateId } from '@/shared/hooks/useGenerateId';

const buttonVariants = {
  whileTap: {
    scale: 0.95,
  },
};

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ 
      icon, 
      btnType, 
      text, 
      onClick, 
      onFocus, 
      type, 
      disabled = false, 
      classname, 
      style 
    }, ref
  ) => {
    const id = useGenerateId();
    const getStatus = (btnType: string): string => {
      switch (btnType) {
        case 'Primary':
          return styles.Primary;
        case 'Transparent':
          return styles.Transparent;
        case 'Secondary':
          return styles.Secondary;
        case 'Danger':
          return styles.Danger;
        default:
          return styles.Primary;
      }
    };

    return (
      <motion.button
        onClick={onClick}
        onFocus={onFocus}
        type={type}
        disabled={disabled}
        className={`${styles.button} ${getStatus(btnType)} ${classname || ''}`}
        style={style}
        whileTap={buttonVariants.whileTap}
        ref={ref}
        id={id}
      >
        <span>
          {icon && <>{icon}</>} {text}
        </span>
      </motion.button>
    );
  }
);

export default Button;
