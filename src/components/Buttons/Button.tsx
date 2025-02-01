import React, { forwardRef, MouseEvent } from 'react';
import styles from './Button.module.scss';
import btnTypes from './types.module.scss';
import btnRadius from './radius.module.scss';
import btnSizes from './sizes.module.scss';
import Props from './types';
import { useGenerateId } from '@/shared/hooks/useGenerateId';
import Lottie from 'lottie-react';
import LoadingIcon from '@/icons/LoadingIcon.json';
import btnGlowes from "@/components/Buttons/glow.module.scss";

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
      ripple = true,
      glow,
      ...props
    }, ref
  ) => {
    const id = useGenerateId(6);

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
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        onClick?.(e);
      } else {
        e.preventDefault();
      }
    }
    const handleMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
      if (!disabled && ripple) {
        handleRipple(e);
      } else {
        return;
      }
    }

    return (
      <button
        onClick={handleClick}
        onFocus={onFocus}
        onMouseDown={handleMouseDown}
        type={action}
        className={`${styles.button} ${btnTypes[type] || 'default'} ${btnGlowes[glow] || ''} ${btnRadius[radius]} ${btnSizes[size]} ${classname || ''} ${isLoading ? btnTypes.disabled : ''} ${disabled ? btnTypes.disabled : ''}`}
        style={style}
        ref={ref}
        id={id}
        aria-label={text}
        aria-labelledby={ariaLabelledBy}
        aria-disabled={disabled}
        data-ripple={ripple}
        {...props}
      >
        <span className={styles.iconContainer}>
          {!isLoading && Icon && (
            <Icon className={styles.icon} />
          ) || isLoading && (
          <Lottie
            animationData={LoadingIcon}
            className={styles.icon__loading}
          />
          )}
        </span>
        <span className={styles.textContainer}>
          {text && text}
        </span>
      </button>
    );
  }
);

export default Button;
