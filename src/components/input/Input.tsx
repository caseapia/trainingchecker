import { forwardRef, useId } from "react";
import styles from "./Input.module.scss";

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
    const id = useId();

    return (
      <div className={styles.inputContainer}>
        <label htmlFor={id + `-${name}`}
          className={styles.label}>
          {label}{" "}
          {required && <span className={styles.required}>*</span>}
        </label>
        <div
          className={`${styles.input} ${classname || ""} ${disabled ? styles.disabled : ""}`}
          style={{ marginBottom: `${marginBottom}px` }}
          role="input"
        >
          {Icon &&
            <Icon
              className={styles.icon}
              width={18}
              height={18}
            />
          }
          <input
            type={type}
            id={id + `-${name}`}
            onInput={onInput}
            onChange={onChange}
            onClick={onClick}
            disabled={disabled}
            placeholder={placeholder}
            name={name}
            ref={ref}
            required={required}
            value={value}
            spellCheck="false"
          />
        </div>
      </div>
    );
  }
);

export default Input;
