import React from 'react';
import { useToast } from './context/ToastContext';
import styles from './Toast.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import Lottie from 'lottie-react';
import success from '@/public/assets/lotties/success.json';
import defaultNotify from '@/public/assets/lotties/defaultNotify.json'; 
import error from '@/public/assets/lotties/error.json';

const ToastAnimation = {
  initial: { bottom: '-80px', opacity: 0, marginTop: 0, transition: { duration: 0.3 }},
  animate: { bottom: '20px', opacity: 1, marginTop: '20px', transition: { duration: 0.3 } },
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
              <Lottie 
                animationData={toast.type === 'success' ? success : toast.type === 'error' ? error : defaultNotify}
                loop={false}
                style={{ height: '80px', width: '80px' }}
              />
            </section>
            <section className={styles.Body}>
              {toast.title && <div className={styles.Title}>{toast.title}</div>}
              {toast.content && <div className={styles.Content}>{toast.content}</div>}
            </section>
            <div 
              className={`${toast.lifeTime ? styles.ProgressBar : ''}`}
              style={{ animationDuration: `${toast.lifeTime}ms` }}
            >

            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
