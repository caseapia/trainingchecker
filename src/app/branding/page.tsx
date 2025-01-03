"use client"
import React from 'react';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import Button from '@/components/Buttons/Button';
import Input from '@/components/Input/Input';
import Chip from '@/components/Chip/Chip';
import styles from './page.module.scss';

const Page = () => {

  return (
    <PageWrapper>
      <div className={`${styles.container} ${styles.gapped}`}>
        <h2>Buttons</h2>
        <Button
          action="button"
          type="Outlined"
          text="Outlined button"
        />
        <Button
          action="button"
          type="Danger"
          text="Danger button"
        />
        <Button
          action="button"
          type="Transparent"
          text="Transparent button"
        />
        <Button
          action="button"
          type="Secondary"
          text="Secondary button"
        />
        <Button
          action="button"
          type="Violet"
          text="Violet button"
        />
        <Button
          action="button"
          type="Primary"
          text="Primary button"
        />
      </div>
      <div className={styles.container}>
        <h2>Input</h2>
        <Input
          label="Required input"
          type="text"
          placeholder="This is a preview input"
          required
        />
        <Input
          label="Not required input"
          type="text"
          placeholder="This is a preview input"
        />
      </div>
    </PageWrapper>
  );
};

export default Page;
