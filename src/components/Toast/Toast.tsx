import React from 'react';
import { useToast } from './context/ToastContext';
import styles from './Toast.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

const ToastAnimation = {
  initial: { bottom: '-80px', opacity: 0, marginTop: 0, transition: { duration: 0.2 }},
  animate: { bottom: '20px', opacity: 1, marginTop: '20px', transition: { duration: 0.2 } },
};

const Toast = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className={`${styles.ToastWrapper}`}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className={`${styles.Toast} ${toast.type === "success" ? styles.success : toast.type === "error" ? styles.error : styles.default} ${toast.className || ''}`}
            onClick={() => removeToast(toast.id)}
            initial={ToastAnimation.initial}
            animate={ToastAnimation.animate}
            exit={ToastAnimation.initial}
          >
            <section className={styles.IconContainer}>
              {toast.icon && toast.icon}
            </section>
            <section>
              {toast.title && <div className={styles.Title}>{toast.title}</div>}
              {toast.content && <div className={styles.Content}>{toast.content}</div>}
              <div className={styles.Footer}>Нажмите, чтобы закрыть это уведомление</div>
            </section>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
