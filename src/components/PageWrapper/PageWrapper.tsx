import React from 'react';
import styles from './PageWrapper.module.scss';
import Props from './types';

const PageWrapper = ({ title, children, classname }: Props) => {
  return (
    <div className={`${classname || ""} ${styles.PageWrapper}`}>
      {title && <h1>{title}</h1>}
      {children}
    </div>
  )
}

export default PageWrapper;