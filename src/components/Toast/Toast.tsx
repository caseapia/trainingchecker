import React from 'react';
import { useToast } from './context/ToastContext';
import styles from './Toast.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import Lottie from 'lottie-react';
import success from '@/public/assets/lotties/success.json';
import defaultNotify from '@/public/assets/lotties/defaultNotify.json'; 
import error from '@/public/assets/lotties/error.json';
import ToastAnimation from './variant';
import XIcon from '@/icons/components/modal/xmark.svg';

const Toast = () => {
  const { toasts, removeToast } = useToast();

  const getType = (type: any) => {
    switch (type) {
      case 'success':
        return styles.success
      case 'error':
        return styles.error
      default:
        return styles.default
    }
  }

  const handleClick = (toast: any) => {
    toast.clickAction(toast);
    removeToast(toast.id);
  }

  return (
    <div className={`${styles.ToastWrapper}`}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className={`${styles.Toast} ${getType(toast.type)} ${toast.className || ''} ${toast.clickAction ? styles.clickable : ''}`}
            onClick={toast.clickAction ? () => handleClick(toast) : undefined}
            initial={ToastAnimation.initial}
            animate={ToastAnimation.animate}
            exit={ToastAnimation.initial}
          >
            <section className={styles.IconContainer}>
              <Lottie
                animationData={toast.type === 'success' ? success : toast.type === 'error' ? error : defaultNotify}
                loop={false}
                style={{ height: '80px', width: '80px' }}
              />
            </section>
            <section className={styles.Body}>
              <div className={styles.Title}>
                {toast.type === 'success' ? 'Успешно' : toast.type === 'error' ? 'Ошибка' : 'Внимание'}
                {toast.isExitButton && (
                  <XIcon onClick={() => removeToast(toast.id)} />
                )}
              </div>
              {toast.content && <div className={styles.Content}>{toast.content}</div>}
            </section>
            {toast.lifeTime && (
              <div className={styles.ProgressBar} style={{ animationDuration: `${toast.lifeTime}ms` }} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
