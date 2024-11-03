import { ReactNode, useEffect, useState } from 'react';
import styles from './Button.module.scss';
import { motion } from "framer-motion";

interface Props {
  icon?: ReactNode;
  btnType: "Primary" | "Transparent" | "Secondary" | "Danger";
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  type: "submit" | "reset" | "button";
  disabled?: boolean;
  classname?: string;
  style?: React.CSSProperties;
}

const Button = ({   
  icon, 
  text, 
  onClick, 
  onFocus, 
  btnType,
  type, 
  disabled = false, 
  classname = '',
  style  }: Props) => {
  const [string, setString] = useState<string>('');
  useEffect(() => {
    const generateID = (length: number): string => {
      const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!?';
      let result: string = '';
      
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }

      return result;
    }
    
    const newID = generateID(6);
    setString(newID)
  }, [])
  const getStatus = (btnType: string): string => {
    switch (btnType) {
      case 'Primary':
        return styles.Primary;
      case 'Transparent':
        return styles.Transparent;
      case 'Secondary':
        return styles.Secondary;
      case 'Danger':
        return styles.Danger;
      default:
        return styles.Primary;
    }
  }
  return (
    <>
      <motion.button
        onClick={onClick}
        onFocus={onFocus}
        type={type}
        disabled={disabled}
        className={`${styles.button} ${getStatus(btnType)} ${classname || ''}`}
        style={style}
        id={string}
        whileTap={{ scale: 0.9 }}
      >
        {icon && (<> {icon} </>)} {text}
      </motion.button>
    </>
  )
}

export default Button