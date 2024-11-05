import React, { ReactNode, useState } from 'react';
import styles from './Notify.module.scss';

interface Props {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  type?: "error" | "warning" | "success" | "default";
  title?: string;
  handleOpen: () => void;
  handleClose: () => void; 
}

const Toast = ({ icon, children, className, type = "default", title, handleOpen, handleClose }: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(true);

  const onClose = () => {
    setIsOpened(false);
    handleClose();
  }

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
  }
  const getActive = (isOpened: boolean) => {
    switch (isOpened) {
      case true:
        return styles.active
      default:
        return;
    }
  }

  return (
    <div 
      className={`${styles.NotifyWrapper} ${getActive(isOpened)}`}
      onClick={onClose}
    >
      <div className={`${styles.Notify} ${getType(type)} ${className || ''}`}>
        {title && (
          <div className={styles.Title}>
            {title}
          </div>
        )}
        {icon && (
          <div className={styles.IconContainer}>
            {icon}
          </div>
        )}
        {children && (
          <div className={styles.Content}>
            {children}
          </div>
        )}
        <div className={styles.Footer}>
          Нажмите чтобы закрыть это уведомление
        </div>
      </div>
    </div>
  );
}

export default Toast;
