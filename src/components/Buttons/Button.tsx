import { forwardRef } from 'react';
import styles from './Button.module.scss';
import buttonTypes from './buttonTypes.module.scss';
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
      type = 'default',
      disabled = false, 
      classname, 
      style,
      isLoading = false,
      ariaLabel,
      ariaLabelledBy,
    }, ref
  ) => {
    const id = useGenerateId();

    return (
      <button
        onClick={onClick}
        onFocus={onFocus}
        type={action}
        disabled={isLoading ? true : disabled}
        className={`${styles.button} ${buttonTypes[type] || 'default'} ${classname || ''}`}
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
      </button>
    );
  }
);

export default Button;
