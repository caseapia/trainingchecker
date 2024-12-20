"use client"
import React, { useEffect, useState, Suspense, useRef } from "react";
import styles from "./page.module.scss";
import { Input } from "@/components/Input/Input";
import Button from "@/components/Buttons/Button";
import Loader from "@/modules/Loader/Loader";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { toast } from "@/utils/toast";
import CheckIcon from '@/icons/checkCircle.svg';
import UserIcon from '@/icons/user.svg';
import GithubIcon from '@/icons/page-main/github.svg';

export default function Home() {
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
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

  function validation(event: React.FormEvent) {
    if (InputElement.current && InputElement.current.value.length === 0) {
      event.preventDefault();
      if (ButtonElement.current) {
        ButtonElement.current.disabled = true;
      }
      toast.error('Вы не заполнили поле никнейма', { title: "Поле никнейма не заполнено", lifeTime: 4000, })
    } else {
      FormElement.current?.submit;
      if (ButtonElement.current) {
        ButtonElement.current.disabled = false;
      }
      toast.clear();
    }
  }
  const testInput = () => {
    const cyrillicPattern = /[а-яА-ЯёЁ]/;
    if (InputElement && InputElement.current) {
      const textContent = InputElement.current.value || '';
      if (cyrillicPattern.test(textContent)) {
        InputElement.current.value = '';
        toast.error('Никнейм не может состоять из символов кириллицы', { title: "Ошибка", lifeTime: 4000, })
        if (ButtonElement.current) {
          ButtonElement.current.disabled = true;
        }
        toast.clear();
      } else if (InputElement.current && InputElement.current.value.length === 0) {
        toast.error('Поле никнейма не может быть пустым', { title: "Ошибка", lifeTime: 4000, })
        if (ButtonElement.current) {
          ButtonElement.current.disabled = true;
        }
      } else {
        toast.clear();
        if (ButtonElement.current) {
          ButtonElement.current.disabled = false;
        }
      }
    }
  }

  return (
    <>
      <Suspense fallback={<Loader />}>
        <PageWrapper classname={styles.gapped}>
          {isLoaded ?
           (
            <>
              <div className={styles.readmeWrapper}>
                <p style={{textAlign: 'center'}}>SAMP сервер <a href="https://training-server.com/" target="_blank" rel="noopener noreferrer">TRAINING</a> не имеет отношения к созданию данного сайта. Этот сайт является частным и использует<br /><a href="https://forum.training-server.com/d/3921-training-api" target="_blank" rel="noopener noreferrer">TRAINING API</a> в соответствии с разрешением его создателя.</p><br />
                <p>Разработано для упрощения работы с <a href="https://forum.training-server.com/d/3921-training-api" target="_blank" rel="noopener noreferrer">TRAINING API</a>.</p>
                <p>Этот проект имеет открытый исходный код, вы всегда можете дополнить его или исправить, используя<br /><a href="https://github.com/1dontkillme/trainingchecker" target="_blank" rel="noopener noreferrer"><GithubIcon width={16} height={16} /> исходный код на GitHub</a>.</p><br />
                <p>Последнее обновление произошло: {lastUpdate}</p>
              </div>
              <form 
                action="./player" 
                method="get" 
                className={styles.FormContainer} 
                ref={FormElement}
              >
                <Input 
                  icon={UserIcon}
                  label="Введите никнейм игрока" 
                  type="text" 
                  name="nickname" 
                  ref={InputElement} 
                  onChange={testInput}
                  required={true}
                />
                <Button 
                  type="Primary" 
                  text="Проверить" 
                  action="submit" 
                  icon={CheckIcon}
                  onClick={validation} 
                  ref={ButtonElement} 
                  disabled 
                />
              </form>
            </>
          ) : (
            <Loader />
          )
          }
        </PageWrapper>
      </Suspense>
    </>
  );
}
