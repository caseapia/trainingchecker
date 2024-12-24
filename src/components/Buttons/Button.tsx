import { forwardRef } from 'react';
import styles from './Button.module.scss';
import { motion } from "framer-motion";
import Props from './types';
import { useGenerateId } from '@/shared/hooks/useGenerateId';
import Lottie from 'lottie-react';
import LoadingIcon from '@/icons/LoadingIcon.json';

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
      style,
      isLoading = false,
      ariaLabel,
      ariaLabelledBy,
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
        case 'Outlined':
          return styles.Outlined;
	      case 'Violet':
					return styles.Violet;
        default:
          return styles.Primary;
      }
    };

    return (
      <motion.button
        onClick={onClick}
        onFocus={onFocus}
        type={action}
        disabled={isLoading ? true : disabled}
        className={`${styles.button} ${getStatus(type)} ${classname || ''}`}
        style={style}
        ref={ref}
        id={id}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        <span>
          {!isLoading && Icon && <Icon className={styles.icon} /> }
          {isLoading ? (
            <Lottie 
              animationData={LoadingIcon}
              className={styles.icon__loading}
            />
          ) : text && text}
        </span>
      </motion.button>
    );
  }
);

export default Button;
