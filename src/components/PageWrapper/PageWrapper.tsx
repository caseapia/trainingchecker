import React from 'react';
import styles from './PageWrapper.module.scss';

interface Props {
  title?: React.ReactNode;
  children: React.ReactNode;
  classname?: string;
}

const PageWrapper = ({ title, children, classname }: Props) => {
  return (
    <div className={`${classname || ''} ${styles.PageWrapper}`}>
      <h1>{title}</h1>
      {children}
    </div>
  )
}

export default PageWrapper;