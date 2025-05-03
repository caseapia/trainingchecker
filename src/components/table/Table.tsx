import React from 'react';
import styles from './Table.module.scss';
import {TableProps, Props} from './types';



const Thead = ({ children, className }: Props) => {
  return (
    <thead className={className || ''}>
      {children}
    </thead>
  );
};
const TBody = ({ children, className }: Props) => {
  return (
    <tbody className={className || ''}>
      {children}
    </tbody>
  );
};
const Tr = ({ children, style, className }: Props) => {
  return (
    <tr style={style} className={className || ''}>
      {children}
    </tr>
  )
};
const Td = ({ children, style, colSpan, className }: Props) => {
  return (
    <td style={style} colSpan={colSpan} className={className || ''}>
      {children}
    </td>
  )
}
const Th = ({ children, style, colSpan, className }: Props) => {
  return (
    <th style={style} colSpan={colSpan} className={className || ''}>
      {children}
    </th>
  )
}

const Table = ({ width, className, children }: TableProps) => {
  return (
    <table style={{ width: `${width}%` }} className={`${styles.Table} ${styles[className || '']}`}>
      {children}
    </table>
  );
};

export { Table, Thead, TBody, Tr, Td, Th };