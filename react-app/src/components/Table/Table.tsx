import React from 'react';
import styles from './Table.module.scss';

interface Props {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  colSpan?: number;
}
interface TableProps {
  width?: number;
  className?: string;
  children?: React.ReactNode;
}

const Thead = ({ children }: Props) => {
  return (
    <thead>
      {children}
    </thead>
  );
};
const TBody = ({ children }: Props) => {
  return (
    <tbody>
      {children}
    </tbody>
  );
};
const Tr = ({ children, style }: Props) => {
  return (
    <tr style={style}>
      {children}
    </tr>
  )
};
const Td = ({ children, style, colSpan }: Props) => {
  return (
    <td style={style} colSpan={colSpan}>
      {children}
    </td>
  )
}
const Th = ({ children, style, colSpan }: Props) => {
  return (
    <th style={style} colSpan={colSpan}>
      {children}
    </th>
  )
}

const Table = ({ width, className, children }: TableProps) => {
  return (
    <table style={{ width: `${width}%` }} className={`${styles.Table} ${className || ''}`}>
      {children}
    </table>
  );
};

export { Table, Thead, TBody, Tr, Td, Th };