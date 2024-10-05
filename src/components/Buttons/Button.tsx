import React from 'react';
import styles from './Button.module.scss';

interface Props {
    spec: "primary" | "outlined" | "secondary" | "blured" | "danger";
    type: "button" | "submit" | "reset";
    icon?: React.ReactNode,
    onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    id?: string;
    children?: React.ReactNode;
    disabled?: boolean;
}

export const Button = ({ type, icon, onClick, className, id, children, disabled = false, spec }: Props) => {
    function getButtonSpec(type: string): string {
        switch (type) {
            case "primary":
                return styles.button__primary;
            case "outlined":
                return styles.button__outlined;
            case "secondary":
                return styles.button__secondary;
            case "blured":
                return styles.button__blured;
            case "danger":
                return styles.button__danger;
            default:
                throw new Error(`Unknown button type: ${type}`);
        }
    }

    return (
        <button
            type={type}
            onClick={onClick || undefined}
            className={`${styles.button} ${getButtonSpec(spec)} ${className || ''}`}
            id={id || undefined}
            disabled={disabled}
        >
            {icon && (
                <>
                    {icon}
                </>
            )}
            {children}
        </button>
    );
};