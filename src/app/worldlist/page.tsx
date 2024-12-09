"use client"
import { Suspense, useEffect, useState } from 'react';
import styles from './page.module.scss'
import Preloader from '@/public/assets/lotties/Preloader.json';
import Lottie from 'lottie-react';
import { Table, Thead, Tr, Td, Th, TBody } from '@/components/Table/Table';
import Chip from '@/components/Chip/Chip';
import { FaBookmark } from "react-icons/fa6";
import { GoCpu, GoAlertFill } from "react-icons/go";
import Button from '@/components/Buttons/Button';
import { FaCheckCircle, FaCopy } from 'react-icons/fa';
import { MdDeblur, MdError, MdLensBlur } from "react-icons/md";
import worldBlockWorlds from '@/consts/worldBlockWords';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { toast } from '@/utils/toast';

interface Worlds {
  name: string;
  players: number;
  static: boolean;
  ssmp: boolean;
  timestamp: number;
}

const WorldList = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [result, setResult] = useState<Worlds[] | null>(null)
  const [sensMode, setSensMode] = useState<boolean>(false);
  const [originalWorlds, setOriginalWorlds] = useState<Worlds[] | null>(null);

  useEffect(() => {
    let timeoutId: any;
  
    const getWorlds = async () => {
      const url = process.env.NEXT_PUBLIC_API_WORLDLIST_URL;
  
      if (!url) {
        setIsLoaded(false);
        return;
      }
  
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResult(data.worlds);
        setOriginalWorlds(data.worlds);
        setIsLoaded(true);
      } catch (err) {
        console.error('Error:', err);
        setIsLoaded(false);
      } finally {
        clearTimeout(timeoutId);
      }
    };
  
    timeoutId = setTimeout(() => {
      if (!isLoaded) {
        toast.error(`Превышено время ожидания запроса`, { icon: <MdError />, title: 'Непредвиденная ошибка' });
        getWorlds();
      }
    }, 8000);
  
    getWorlds();
  
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const transformWorldName = (text: string) => {
    const regex = /{(.*?)}/g;
    const parts = text.split(regex);
    const elements = [];

    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 1) {
        const color = parts[i].trim();
        const formattedColor = color.startsWith('#') ? color : `#${color}`;
        const nextText = parts[i + 1];
        if (nextText) {
          elements.push(
            <span key={i} style={{ color: formattedColor }}>{nextText}</span>
          );
          i++;
        }
      } else if (parts[i]) {
        elements.push(parts[i]);
      }
    }
    return elements;
  };

  const copyWorlds = () => {
    if (result && result.length > 0) {
      const toCopyContent = result
        .map(world => {
          const ssmpCondition = world.ssmp;
          const staticCondition = world.static;

          const ssmp = () => {
            return ssmpCondition === true ? ' // Использует SSMP' : '';
          };
          const staticW = () => {
            return staticCondition === true ? ' // Статичный' : ''
          };
          return `Название: ${world.name} // Игроков: ${world.players}${ssmp()}${staticW()}`;
        })
        .join(';\n')
      const worldsCounter = result.length;
      const isSensModeActive = sensMode === true ? 'Чувствительный режим включен' : '';

      navigator.clipboard.writeText(`${isSensModeActive}\n\n${toCopyContent}\n\nВсего миров: ${worldsCounter}`);
      toast.success('Список открытых миров скопирован в ваш буфер обмена', { icon: <FaCheckCircle />, title: 'Успешно' });
    }
  };

  const sensitiveMode = () => {
    if (result) {
      if (sensMode === false) {
        const filteredWorlds = result.filter(world =>
          !worldBlockWorlds.some(forbiddenWord =>
            world.name.toLowerCase().includes(forbiddenWord)
          )
        );
        setResult(filteredWorlds);
        setSensMode(true);
        toast.success('Чувствительный режим включен', { icon: <FaCheckCircle />, title: 'Успешно' });
      } else {
        setResult(originalWorlds);
        setSensMode(false);
        toast.success('Чувствительный режим выключен', { icon: <FaCheckCircle />, title: 'Успешно' });
      }
    }
  }

  return isLoaded ? (
    <Suspense fallback={<Lottie animationData={Preloader} />}>
      <PageWrapper title={`Список открытых миров (${result?.length})`}>
        <div className={styles.buttonGroup}>
          <Button 
            btnType='Primary' 
            text='Скопировать' 
            type='button' 
            onClick={copyWorlds} 
            icon={<FaCopy />}
          />
          <Button 
            btnType='Secondary' 
            text={sensMode === true ? 'Выключить чувствительный режим' : 'Включить чувствительный режим'}
            type='button' 
            onClick={sensitiveMode}
            icon={sensMode === true ? <MdDeblur /> : <MdLensBlur />}
          />
        </div>
        <Table>
          <Thead>
            <Tr>
              <Th>Название</Th>
              <Th>Онлайн</Th>
              <Th>Метки</Th>
            </Tr>
          </Thead>
          <TBody>
            {result && result.length > 0 && (
              result.map((world, index) => (
                <Tr key={index}>
                  <Td>{transformWorldName(world.name)}</Td>
                  <Td>{world.players}</Td>
                  <Td className={styles.ChipContainer}>
                    {world.static === true ? (
                      <Chip label="Статичный" size="small" icon={<FaBookmark />} />
                    ) : world.ssmp === true ? (
                      <Chip label="SSMP" size="small" icon={<GoCpu />} />
                    ) : world.static || world.ssmp === false ? (
                      <Chip label="Нет меток" size="small" icon={<GoAlertFill />} />
                    ) : null}
                  </Td>
                </Tr>
              ))
            )}
          </TBody>
        </Table>
      </PageWrapper>
    </Suspense>
  ) : (
    <PageWrapper>
      <Lottie animationData={Preloader} />
    </PageWrapper>
  )
}

export default WorldList;