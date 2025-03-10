import {forwardRef} from "react";
import styles from './Input.module.scss';
import useId from "@mui/utils/useId";

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
     value,
     marginBottom = 0,
   }, ref) => {
    const string = useId();

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
      <div className={styles.inputContainer}>
        <label htmlFor={string} className={styles.label}>
          {label}{' '}
          {required && <span className={styles.required}>*</span>}
        </label>
        <div className={`${styles.input} ${getType(type)}`} style={{marginBottom: `${marginBottom}px`}}>
          {Icon && <Icon className={styles.icon} width={18} height={18}/>}
          <input
            type={type}
            id={string}
            onInput={onInput}
            onChange={onChange}
            onClick={onClick}
            className={classname || ''}
            disabled={disabled}
            placeholder={placeholder}
            name={name}
            ref={ref}
            required={required}
            value={value}
          />
        </div>
      </div>
    );
  }
);

export default Input;
