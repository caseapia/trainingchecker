import { useEffect, useState, forwardRef, ReactNode } from "react";
import styles from './Input.module.scss';
import { useGenerateId } from '@/shared/hooks/useGenerateId';

interface Props {
  label: string;
  type: "text" | "number" | "color" | "checkbox" | "password";
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  classname?: string;
  disabled?: boolean;
  placeholder?: string;
  icon?: ReactNode;
  name?: string;
  onError?: string;
  onEmptied?: (event: React.FormEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, type, onInput, onClick, onChange, classname, disabled, placeholder, icon, name, onError, onEmptied }, ref) => {
    const string = useGenerateId();

    return (
      <>
        <label htmlFor={string} className={styles.label}>{label}</label>
        <input
          type={type}
          id={string}
          onInput={onInput}
          onChange={onChange}
          onClick={onClick}
          className={`${styles.input} ${icon ? styles.WithIcon : `${styles.WithoutIcon}`} ${classname || ''} ${onError ? styles.Error : ''}`} 
          disabled={disabled}
          placeholder={placeholder}
          name={name}
          ref={ref}
          onEmptied={onEmptied}
        />
        {icon && <span className={styles.icon}>{icon}</span>}
      </>
    );
  }
);

export default Input;
