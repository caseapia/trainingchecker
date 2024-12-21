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
      icon: Icon, 
      action, 
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
        type={action}
        disabled={disabled}
        className={`${styles.button} ${getStatus(type)} ${classname || ''}`}
        style={style}
        whileTap={buttonVariants.whileTap}
        ref={ref}
        id={id}
      >
        <span>
          {Icon && <Icon className={styles.icon} />}
          {text}
        </span>
      </motion.button>
    );
  }
);

export default Button;
