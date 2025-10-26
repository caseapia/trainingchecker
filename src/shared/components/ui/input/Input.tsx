"use client"
import { forwardRef, useId } from "react";
import styles from "./Input.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import Props from "@/shared/components/ui/input/types";
import { animationWrapper } from "@/shared/components/ui/input/animation";
import ErrorIcon from "@/icons/error.svg";

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
    error,
  }, ref) => {
    const id = useId();

    return (
      <div
        className={styles.inputContainer}
        style={{ marginBottom: `${marginBottom}px` }}
      >
        <label
          htmlFor={id + `-${name}`}
          className={styles.label}
        >
          {label}{" "}
          {required && <span className={styles.required}>*</span>}
        </label>
        <div
          className={`${styles.input} ${classname || ""} ${disabled ? styles.disabled : ""}`}
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
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="input-error"
              layout
              variants={animationWrapper}
              initial="initial"
              animate="animate"
              exit="exit"
              className={styles.errorWrapper}
            >
              <ErrorIcon/>
              <span className={styles.errorText}>{error.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

export default Input;
