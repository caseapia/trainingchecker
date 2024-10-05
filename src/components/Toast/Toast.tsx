import React, { useState } from 'react';
import styles from './Toast.module.scss';

interface Props {
    children: React.ReactNode;
    toastType: "warning" | "success" | "danger";
    icon?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    active?: boolean;
}

const hideToast = () => {
    const element = document.getElementById('toast') as HTMLElement
    if (element.classList.contains(styles.active)) {
        element.classList.remove(styles.active);
    }
}

export const Toast = ({ children, toastType, icon, className, active = false }: Props) => {
    function getType(toastType: string): string {
        switch (toastType) {
            case "warning":
                return styles.toast__warning;
            case "success":
                return styles.toast__success;
            case "danger":
                return styles.toast__danger;
            default:
                throw new Error(`Unknown toast type: ${toastType}`);
        }
    }

    return (
        <div className={`${styles.toast} ${getType(toastType)} ${active ? styles.active : ''} ${className || ''}`} id='toast' onClick={hideToast}>
            <section className={styles.toast__body}>
                {icon && (
                    <>
                        {icon}
                    </>
                )}
                {children}
            </section>
            <section className={styles.toast__footer}>
                <small>Нажмите на это уведомление, чтобы скрыть его</small>
            </section>
        </div>
    );
};