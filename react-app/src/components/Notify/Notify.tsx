import React, { ReactNode } from 'react';
import styles from './Notify.module.scss';

interface Props {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  type?: "error" | "warning" | "success" | "default";
  title?: string;
  notifyState: boolean;
  onClose: () => void;
}

const Toast = ({ icon, children, className, type = "default", title, notifyState, onClose }: Props) => {
  const getType = (type: string) => {
    switch (type) {
      case "error":
        return styles.error;
      case "warning":
        return styles.warning;
      case "success":
        return styles.success;
      default:
        return styles.default;
    }
  };

  return (
    <div 
      className={`${styles.NotifyWrapper}`} 
      onClick={onClose}
    >
      <div className={`${styles.Notify} ${getType(type)} ${className || ''} ${notifyState ? styles.active : ''}`}>
        <section className={styles.IconContainer}>
          {icon && icon}
        </section>
        <section>
          {title && notifyState && (
            <div className={styles.Title}>
              {title}
            </div>
          )}
          {children && (
            <div className={styles.Content}>
              {children}
            </div>
          )}
          <div className={styles.Footer}>
              Нажмите, чтобы закрыть это уведомление
          </div>
        </section>
      </div>
    </div>
  );
}

export default Toast;
