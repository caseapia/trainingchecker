import { FaXmark } from 'react-icons/fa6';
import styles from './Modal.module.scss';
import Button from '../Buttons/Button';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  title?: string;
  children: React.ReactNode;
  className?: string;
  isOpen: boolean; 
  firstButtonIcon?: React.ReactNode;
  firstButtonContent?: string;
  secondButtonIcon?: React.ReactNode;
  secondButtonContent?: string;
  onClose: () => void;
}

export const Modal = ({
  title,
  children,
  className,
  isOpen,
  firstButtonIcon,
  firstButtonContent,
  secondButtonIcon,
  secondButtonContent,
  onClose,
}: Props) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen ? 
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.FadeOut}
      >
        <motion.div 
          className={`${styles.Modal} ${className || ''}`} 
          key="box" 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <div className={styles.Header}>
            {title && <div className={styles.Title}>{title}</div>}
            <div className={styles.Close}>
              <FaXmark onClick={onClose} />
            </div>
          </div>
          <div className={styles.Body}>{children}</div>
          <div className={styles.Footer}>
            {(firstButtonContent || secondButtonContent) && (
              <div className={styles.ButtonGroup}>
                {firstButtonContent && (
                  <Button
                    btnType="Primary"
                    text={firstButtonContent}
                    type="button"
                    icon={firstButtonIcon || null}
                    onClick={onClose}
                  />
                )}
                {secondButtonContent && (
                  <Button
                    btnType="Secondary"
                    text={secondButtonContent}
                    type="button"
                    icon={secondButtonIcon || null}
                  />
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div> : null}
    </AnimatePresence>
  );
};
