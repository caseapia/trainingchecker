import XmarkIcon from '@/icons/components/modal/xmark.svg';
import styles from './Modal.module.scss';
import Button from '../Buttons/Button';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Props from './types';

const backdropVariants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1 
  },
  exit: { 
    opacity: 0 
  },
};

const modalVariants = {
  hidden: { 
    scale: 0.9, 
    opacity: 0 
  },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: { 
      duration: 0.2 
    }
  },
  exit: { 
    scale: 0.9, 
    opacity: 0, 
    transition: { 
      duration: 0.2 
    } 
  },
};

export const Modal = ({
  title,
  children,
  className,
  isOpen,
  firstButtonIcon: FirstIcon,
  firstButtonContent,
  secondButtonIcon: SecondIcon,
  secondButtonContent,
  onClose,
  firstButtonAction,
  secondButtonAction,
  titleClass = '',
  titleStyle,
}: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mouseup', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.FadeOut}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className={`${styles.Modal} ${className || ''}`}
            variants={modalVariants}
            ref={modalRef}
          >
            <div 
              className={`${styles.Header} ${styles[titleClass]}`}
              style={titleStyle}
            >
              {title && <div className={styles.Title}>{title}</div>}
              <div className={styles.Close}>
                <XmarkIcon onClick={onClose} />
              </div>
            </div>
            <div className={styles.Body}>{children}</div>
            <div className={styles.Footer}>
              {(firstButtonContent || secondButtonContent) && (
                <div className={styles.ButtonGroup}>
                  {firstButtonContent && (
                    <Button
                      type="Primary"
                      text={firstButtonContent}
                      action="button"
                      icon={FirstIcon}
                      onClick={firstButtonAction}
                    />
                  )}
                  {secondButtonContent && (
                    <Button
                    type="Secondary"
                      text={secondButtonContent}
                      action="button"
                      icon={SecondIcon}
                      onClick={secondButtonAction}
                    />
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
