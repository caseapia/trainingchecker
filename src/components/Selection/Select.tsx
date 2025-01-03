import React, { useState } from 'react';
import types from './types';
import styles from './Select.module.scss';
import sizes from './Sizes.module.scss';
import CaretDownIcon from '@/icons/components/selection/caretdown.svg';
import CaretUpIcon from '@/icons/components/selection/caretup.svg';
import { useGenerateId } from '@/shared/hooks/useGenerateId';
import {AnimatePresence, motion} from "framer-motion";
import listVariants from './variants';

const Select = (
  {
    label,
    options,
    defaultString,
    onChange,
    required = false,
    size = 'full',
  }: types & { onChange: (option: string) => void }
) => {
  const id = useGenerateId();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpened(false);
    onChange(option);
  };

  return (
    <AnimatePresence>
      <div className={`${styles.SelectWrapper} ${sizes[size]}`}>
        {label && (
          <label
            htmlFor={id}
            className={styles.Label}
          >
            {label}{' '}
            {required && <span className={styles.Required}>*</span>}
          </label>)}
        <div
          className={styles.Selection}
          id={id}
          role="listbox"
          onClick={() => setIsOpened(!isOpened)}
        >
          <p className={styles.SelectedOption}>
            {selectedOption || defaultString}
            {!isOpened ? <CaretDownIcon /> : <CaretUpIcon />}
          </p>
        </div>
        {isOpened && (
          <motion.div
            className={styles.OptionsList}
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {typeof options !== "string" ? options.map((option, index) => (
              <div
                key={index}
                className={styles.SelectionOption}
                role="option"
                aria-selected={selectedOption === option}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            )) : null}
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default Select;
