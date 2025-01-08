import { forwardRef } from "react";
import styles from './Input.module.scss';
import { useGenerateId } from '@/shared/hooks/useGenerateId';

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ 
    label, 
    type, 
    onInput, 
    onClick, 
    onChange, 
    classname, 
    disabled = false, 
    placeholder, 
    icon: Icon, 
    name,
    required = false,
    value
  }, ref) => {
    const string = useGenerateId(12);

    const getType = (type: any) => {
      switch (type) {
        case 'text':
          return `${styles.input} ${Icon ? styles.WithIcon : `${styles.WithoutIcon}`}`
        case 'checkbox':
          return `${styles.checkbox}`
        default:
          return `${styles.input} ${Icon ? styles.WithIcon : `${styles.WithoutIcon}`}`
      }
    }

    return (
      <>
        <label htmlFor={string} className={styles.label}>
          {label}{' '}
          {required && <span className={styles.Required}>*</span>}
        </label>
        <input
          type={type}
          id={string}
          onInput={onInput}
          onChange={onChange}
          onClick={onClick}
          className={`${getType(type)} ${classname || ''}`}
          disabled={disabled}
          placeholder={placeholder}
          name={name}
          ref={ref}
          required={required}
          value={value}
        />
        {Icon && <Icon className={styles.icon} width={18} height={18} />}
      </>
    );
  }
);

export default Input;
