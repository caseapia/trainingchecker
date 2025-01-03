"use client"
import React, {useEffect} from 'react';
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import Select from '@/components/Selection/Select';
import { useRouter } from "next/navigation";
import {toast} from "@/utils/toast";
import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import UserIcon from '@/icons/user.svg';
import styles from './test.module.scss'

const Page = () => {
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  const router = useRouter();

  const handleSelectChange = (option: string) => {
    setSelectedOption(option);
  }

  useEffect(() => {
    if (!window.location.href.includes('localhost') && !window.location.href.includes('dev')) {
      router.push('../');
      toast.error('У вас нет доступа к этой странице, производится перенаправление на главную страницу', {
        lifeTime: 7000,
      })
    }
  })

  return (
    <PageWrapper title="Test">
      <Select
        name="test"
        options={[ "test 1", "test 1.5", "test 2", "test 3", ]}
        defaultString="Pick the test label"
        onChange={handleSelectChange}
        size="medium"
      />
      <section className={styles.gap}>
        <Button
        type="Primary"
        action="button"
        text="Primary button"
        size="medium"
      />
        <Button
          type="Primary"
          action="button"
          text="Primary button with icon"
          icon={UserIcon}
          size="medium"
        />
        <Button
          type="Secondary"
          action="button"
          text="Secondary button"
          size="medium"
        />
        <Button
          type="Secondary"
          action="button"
          text="Secondary button with icon"
          icon={UserIcon}
          size="medium"
        />
        <Button
          type="Violet"
          action="button"
          text="Violet button"
          size="medium"
        />
        <Button
          type="Violet"
          action="button"
          text="Violet button with icon"
          icon={UserIcon}
          size="medium"
        />
        <Button
          type="Danger"
          action="button"
          text="Danger button"
          size="medium"
        />
        <Button
          type="Danger"
          action="button"
          text="Danger button with icon"
          icon={UserIcon}
          size="medium"
        />
        <Button
          type="Outlined"
          action="button"
          text="Outlined button"
          size="medium"
        />
        <Button
          type="Outlined"
          action="button"
          text="Outlined button with icon"
          icon={UserIcon}
          size="medium"
        />
        <Button
          type="Transparent"
          action="button"
          text="Transparent button"
          size="medium"
        />
        <Button
          type="Transparent"
          action="button"
          text="Transparent button with icon"
          icon={UserIcon}
          size="medium"
        />
      </section>
    </PageWrapper>
  );
};

export default Page;