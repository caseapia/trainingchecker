import { useEffect, useState } from "react";
import styles from './Input.module.scss'
import { ReactNode } from 'react';

interface Props {
  label: string;
  type: "text" | "number" | "color" | "checkbox" | "password";
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  classname?: string;
  disabled?: boolean;
  placeholder?: string;
  icon?: ReactNode;
  name?: string;
}

export const Input = ({ label, type, onInput, onClick, onChange, classname, disabled = false, placeholder, icon, name }: Props) => {
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
  return (
    <>
      <label htmlFor={string} className={styles.label}>{label}</label>
      <input 
        type={type} 
        id={string}
        onInput={onInput}
        onChange={onChange}
        onClick={onClick}
        className={`${styles.input} ${classname || ''} ${icon || styles.nullIcon}`} 
        disabled={disabled}
        placeholder={placeholder}
        name={name}
      />
      {icon && (<> <span className={styles.icon}>{icon}</span> </>)}
    </>
  )
}