import XmarkIcon from "@/icons/components/xmark.svg";
import styles from "./Modal.module.scss";
import Button from "@/shared/components/ui/button/Button";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Props from "./types";
import { backdropVariants, modalVariants } from "./variants";

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
  titleClass = "",
  titleStyle,
  closeButton = true,
  classNameBody = "",
}: Props) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && closeButton && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mouseup", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [isOpen, onClose]);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen) {
      onClose();
    }
  })

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="backdrop"
          className={styles.FadeOut}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            key="modal"
            className={`${styles.Modal} ${className || ""}`}
            variants={modalVariants}
            ref={modalRef}
          >
            <div
              className={`${styles.Header} ${styles[titleClass]}`}
              style={titleStyle}
            >
              {title && <div className={styles.Title}>{title}</div>}
              {closeButton && (
                <div className={styles.Close}>
                  <XmarkIcon onClick={onClose}/>
                </div>
              )}
            </div>
            <div className={`${styles.Body} ${classNameBody}`}>{children}</div>
            <div className={styles.Footer}>
              {(firstButtonContent || secondButtonContent) && (
                <div className={styles.ButtonGroup}>
                  {firstButtonContent && (
                    <Button
                      type="Violet"
                      action="button"
                      icon={FirstIcon}
                      onClick={firstButtonAction}
                    >
                      {firstButtonContent}
                    </Button>
                  )}
                  {secondButtonContent && (
                    <Button
                      type="Outlined"
                      action="button"
                      icon={SecondIcon}
                      onClick={secondButtonAction}
                    >
                      {secondButtonContent}
                    </Button>
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
