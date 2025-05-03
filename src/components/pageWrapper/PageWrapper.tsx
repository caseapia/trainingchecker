import React from 'react';
import styles from './PageWrapper.module.scss';
import Props from './types';

const PageWrapper = ({ title, children, classname, style }: Props) => {
  return (
    <div
      className={`${classname || ""} ${styles.PageWrapper}`}
      style={style}
    >
      {title && <h1>{title}</h1>}
      {children}
    </div>
  )
}

export default PageWrapper;