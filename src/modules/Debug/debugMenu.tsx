import React, {useRef, useState} from 'react';
import styles from './debugMenu.module.scss';
import Button from "@/components/Buttons/Button";
import LinkedButton  from "@/components/Buttons/LinkedButton";
import { Modal } from '@/components/Modal/Modal';
import Select from '@/components/Selection/Select';
import Input from '@/components/Input/Input';
import {toast} from "@/utils/toast";
import {useGenerateId} from "@/hooks/useGenerateId";
import Cookies from "js-cookie";

const DebugMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const toastText = useRef<HTMLInputElement>(null);
  const toastLifetime = useRef<HTMLInputElement>(null);
  const text = useGenerateId(6);

  const highlightElements = () => {
    const elements = document.querySelectorAll<HTMLElement>("*");

    elements.forEach((element) => {
      element.style.border = '1px solid yellow';
    })
    toast.success('All elements have been highlighted by borders.', {
      lifeTime: 5000,
    })
  }

  const handleSelectChange = (option: string) => {
    setSelectedOption(option);
  }

  const handleCallToast = () => {
    if (selectedOption === '' || null || toastText.current?.value === '' || null) {
      toast.error('Вы не заполнили обязательные поля', {
        lifeTime: 5000
      })
    } else {
      switch (selectedOption) {
        case 'basic':
          return toast.basic(`${toastText.current?.value}`)
        case 'error':
          return toast.error(`${toastText.current?.value}`)
        case 'success':
          return toast.success(`${toastText.current?.value}`)
      }
      setIsModalOpen(false);
    }
  }

  const handleGenerateData = () => {
    const min: number = 1000;
    const max: number = 10000;
    const type = Math.floor(Math.random() * 3);
    const lifeTime = Math.floor(Math.random() * (max - min + 1)) + min;

    switch (type) {
      case 1:
        return toast.basic(`${text} (lifeTime: ${lifeTime})`, {
          lifeTime: lifeTime,
        })
      case 2:
        return toast.error(`${text} (lifeTime: ${lifeTime})`, { lifeTime: lifeTime })
      case 3:
        return toast.success(`${text} (lifeTime: ${lifeTime})`, { lifeTime: lifeTime })
    }
  }

  const removeCookies = () => {
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach(cookieName => {
      Cookies.remove(cookieName);
    })
    toast.success('All cookies have been removed.')
    window.location.reload();
  }

  return (
    <>
      <div className={styles.wrapper}>
        <Button
          action="button"
          type="Primary"
          text="Call toast"
          onClick={() => setIsModalOpen(true)}
          size="small"
        />
        <Button
          action="button"
          type="Primary"
          text="Highlight all elements"
          onClick={highlightElements}
          size="small"
        />
        <Button
          action="button"
          type="Primary"
          text="Call modal"
          size="small"
        />
        <LinkedButton
          type="Primary"
          text="Refer to test page"
          href="./test"
          size="small"
        />
        <Button
          action="button"
          type="Primary"
          text="Remove all cookies"
          size="small"
          onClick={removeCookies}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Select toast settings">
        <Select
          defaultString="Select a type"
          onChange={handleSelectChange}
          name="Toast type"
          options={[ 'basic', 'error', 'success' ]}
          label="Toast type"
          required
        />
        <Input
          label="Toast text"
          type="text"
          required
          ref={toastText}
        />
        <Input
          label="Toast lifetime"
          type="number"
          ref={toastLifetime}
        />
        <Button
          type="Primary"
          action="submit"
          text="Submit"
          onClick={handleCallToast}
        />
        <Button
          type="Secondary"
          action="submit"
          text="Random"
          onClick={handleGenerateData}
        />
      </Modal>
    </>
  );
};

export default DebugMenu;