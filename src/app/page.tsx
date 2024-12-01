"use client"
import React, { useEffect, useState, Suspense, useRef, ReactNode } from "react";
import styles from "./page.module.scss";
import buttonstyles from '@/components/Buttons/Button.module.scss';
import { Input } from "@/components/Input/Input";
import Button from "@/components/Buttons/Button";
import { FaCheckCircle, FaUser } from "react-icons/fa";
import { TbFaceIdError } from "react-icons/tb";
import { BiLogoGithub } from "react-icons/bi";
import Lottie from 'lottie-react';
import Preloader from '@/public/assets/lotties/Preloader.json';
import Notify from '@/components/Notify/Notify';
import PageWrapper from "@/components/PageWrapper/PageWrapper";

export default function Home() {
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [notifyState, setNotifyState] = useState<boolean>(false);
  const [notifyText, setNotifyText] = useState<string>('');
  const [notifyTitle, setNotifyTitle] = useState<string>('');
  const [notifyIcon, setNotifyIcon] = useState<ReactNode>();
  const InputElement = useRef<HTMLInputElement>(null);
  const ButtonElement = useRef<HTMLButtonElement>(null);
  const FormElement = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const commits = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/caseapia/trainingchecker/commits`, {
          
        });
        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json',
        }
        if (process.env.NEXT_PRIVATE_API_KEY) {
          headers['Authorization'] = process.env.NEXT_PRIVATE_API_KEY
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const cmts = await response.json();

        if (Array.isArray(cmts) && cmts.length > 0) {
          const lastcmtday = cmts[0].commit.committer.date;
          const lastUpdate = new Date(lastcmtday).toLocaleString();
          setLastUpdate(lastUpdate);
        }
        setIsLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    commits();
  }, []);

  const handleOpen = () => {
    setNotifyState(true);
  }
  const handleClose = () => {
    setNotifyState(false);
    setTimeout(() => {
      setNotifyText('');
      setNotifyTitle('');
      setNotifyIcon('');
    }, 5000);
  }

  function validation(event: React.FormEvent) {
    if (InputElement.current && InputElement.current.value.length === 0) {
      event.preventDefault();
      setNotifyText('Для выполнения поиска вы должны заполнить поле никнейма игрока');
      setNotifyTitle('Вы не заполнили поле никнейма');
      setNotifyIcon(<TbFaceIdError />)
      if (ButtonElement.current) {
        ButtonElement.current.disabled = true;
      }
      handleOpen();
    } else {
      FormElement.current?.submit;
      if (ButtonElement.current) {
        ButtonElement.current.disabled = false;
      }
      handleClose();
    }
  }
  const testInput = () => {
    const cyrillicPattern = /[а-яА-ЯёЁ]/;
    if (InputElement && InputElement.current) {
      const textContent = InputElement.current.value || '';
      if (cyrillicPattern.test(textContent)) {
        InputElement.current.value = '';
        setNotifyTitle('Ошибка');
        setNotifyText('Никнейм не может состоять из символов кириллицы');
        setNotifyIcon(<TbFaceIdError />)
        if (ButtonElement.current) {
          ButtonElement.current.disabled = true;
        }
        handleOpen();
      } else if (InputElement.current && InputElement.current.value.length === 0) {
        setNotifyTitle('Ошибка');
        setNotifyText('Поле никнейма не может быть пустым');
        setNotifyIcon(<TbFaceIdError />)
        if (ButtonElement.current) {
          ButtonElement.current.disabled = true;
        }
        handleOpen();
      } else {
        handleClose();
        if (ButtonElement.current) {
          ButtonElement.current.disabled = false;
        }
      }
    }
  }

  return (
    <>
      <Suspense fallback={<Lottie animationData={Preloader} />}>
        <PageWrapper classname={styles.gapped}>
          {isLoaded ?
           (
            <>
              <div className={styles.readmeWrapper}>
                <p style={{textAlign: 'center'}}>SAMP сервер <a href="https://training-server.com/" target="_blank" rel="noopener noreferrer">TRAINING</a> не имеет отношения к созданию данного сайта. Этот сайт является частным и использует<br /><a href="https://forum.training-server.com/d/3921-training-api" target="_blank" rel="noopener noreferrer">TRAINING API</a> в соответствии с разрешением его создателя.</p><br />
                <p>Разработано для упрощения работы с <a href="https://forum.training-server.com/d/3921-training-api" target="_blank" rel="noopener noreferrer">TRAINING API</a>.</p>
                <p>Этот проект имеет открытый исходный код, вы всегда можете дополнить его или исправить, используя<br /><a href="https://github.com/1dontkillme/trainingchecker" target="_blank" rel="noopener noreferrer"><BiLogoGithub /> исходный код на GitHub</a>.</p><br />
                <p>Последнее обновление произошло: {lastUpdate}</p>
              </div>
              <form 
                action="./result" 
                method="get" 
                className={styles.FormContainer} 
                ref={FormElement}
              >
                <Input 
                  icon={ <FaUser /> }
                  label="Введите никнейм игрока" 
                  type="text" 
                  name="nickname" 
                  ref={InputElement} 
                  onChange={testInput}
                  required={true}
                />
                <Button 
                  btnType="Primary" 
                  text="Проверить" 
                  type="submit" 
                  icon={ <FaCheckCircle /> } 
                  onClick={validation} 
                  ref={ButtonElement} 
                  disabled 
                />
              </form>
            </>
          ) : (
            <Lottie animationData={Preloader} />
          )
          }
        </PageWrapper>
      </Suspense>
      <Notify title={notifyTitle} notifyState={notifyState} onClose={handleClose} type="error" icon={notifyIcon}>
          {notifyText}
      </Notify>
    </>
  );
}
