import React from 'react';
import { useToast } from './context/ToastContext';
import styles from './Toast.module.scss';
import { AnimatePresence, motion } from "framer-motion";

const Toast = () => {
  const { toasts, removeToast } = useToast();

  return (
    <AnimatePresence>
      <div className={`${styles.ToastWrapper}`}>
        {toasts.map((toast) => (
          <motion.div 
            key={toast.id} 
            className={`${styles.Toast} ${toast.type === "success" ? styles.success : toast.type === "error" ? styles.error : styles.default} ${toast.className || ''}`}
            onClick={() => removeToast(toast.id)}
            initial={{ bottom: '-80px', scale: 0.9 }}
            animate={{ bottom: '20px', scale: 1 }}
            exit={{ bottom: '-80px', scale: 0.9 }}
          >
            <section className={styles.IconContainer}>
              {toast.icon && toast.icon}
            </section>
            <section>
            {toast.title && (
              <div className={styles.Title}>
                {toast.title}
              </div>
            )}
            {toast.content && (
              <div className={styles.Content}>
                {toast.content}
              </div>
            )}
            <div className={styles.Footer}>
              Нажмите, чтобы закрыть это уведомление
            </div>
          </section>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  )
}

export default Toast