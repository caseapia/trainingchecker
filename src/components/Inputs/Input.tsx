import React from 'react';
import styles from "./Input.module.scss";

interface Props {
    label?: string,
    name: string,
    type: string,
    error?: string,
    onInput?: (event: React.FormEvent<HTMLInputElement>) => void,
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void,
    className?: any,
    placeholder?: string,
    id?: any,
    disabled?: boolean,
}

export const Input = ({ label, name, type, error, onInput, onClick, className, placeholder, disabled = false, id }: Props) => {
    return (
        <>
            { label && (
                <label htmlFor={name} className={styles.label}>{label}</label>
            )}
            <input type={type} name={name} onInput={onInput} onClick={onClick} className={`${styles.input} ${className || ''}`} placeholder={`${placeholder || ''}`} disabled={disabled} id={`${id || ''}`} />
        </>
    )
}