import React, { forwardRef, MouseEvent } from 'react';
import styles from './Button.module.scss';
import btnTypes from './types.module.scss';
import btnRadius from './radius.module.scss';
import btnSizes from './sizes.module.scss';
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
      ariaLabelledBy,
	    radius = 'medium',
	    size = 'full',
    }, ref
  ) => {
    const id = useGenerateId();

    const handleRipple =  (e: MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget;
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();

      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.className = styles.ripple;

      button.appendChild(ripple);

      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    }

    return (
      <button
        onClick={(e) => {handleRipple(e); onClick?.(e);}}
        onFocus={onFocus}
        type={action}
        disabled={isLoading ? true : disabled}
        className={`${styles.button} ${btnTypes[type] || 'default'} ${btnRadius[radius]} ${btnSizes[size]} ${classname || ''}`}
        style={style}
        ref={ref}
        id={id}
        aria-label={text}
        aria-labelledby={ariaLabelledBy}
      >
        <span>
          {!isLoading && Icon && <Icon className={styles.icon}/>}
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
