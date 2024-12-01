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
import Notify from '@/components/Notify/Notify';
import { FaCheckCircle, FaCopy } from 'react-icons/fa';
import { MdDeblur, MdLensBlur } from "react-icons/md";
import worldBlockWorlds from '@/consts/worldBlockWords';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import BootstrapTooltip from '@/components/Styles/TooltipStyles';

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
  const [notifyState, setNotifyState] = useState<boolean>(false);
  const [notifyText, setNotifyText] = useState<string>('');
  const [notifyTitle, setNotifyTitle] = useState<string>('');
  const [notifyIcon, setNotifyIcon] = useState<React.ReactNode>();
  const [notifyType, setNotifyType] = useState<string>('');
  const [sensMode, setSensMode] = useState<boolean>(false);
  const [originalWorlds, setOriginalWorlds] = useState<Worlds[] | null>(null);

  useEffect(() => {
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
        setOriginalWorlds(data.worlds)
        setIsLoaded(true);
      } catch (err) {
        console.error('Error:', err);
        setIsLoaded(false);
      }
    }

    getWorlds();
  }, [])

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

  const handleOpen = () => setNotifyState(true);
  const handleClose = () => setNotifyState(false);

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
      setNotifyTitle('Успешно');
      setNotifyType('success')
      setNotifyText('Список открытых миров скопирован в ваш буфер обмена');
      setNotifyIcon(<FaCheckCircle />)
      handleOpen();
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
        setNotifyTitle('Успешно');
        setNotifyType('success')
        setNotifyText('Чувствительный режим включен');
        setNotifyIcon(<FaCheckCircle />);
        handleOpen();
      } else {
        setResult(originalWorlds);
        setSensMode(false);
        setNotifyTitle('Успешно');
        setNotifyType('success')
        setNotifyText('Чувствительный режим выключен');
        setNotifyIcon(<FaCheckCircle />);
        handleOpen();
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
      <Notify 
        notifyState={notifyState} 
        onClose={handleClose} 
        title={notifyTitle} 
        icon={notifyIcon} 
        type={notifyType}
      >
        {notifyText}
      </Notify>
    </Suspense>
  ) : (
    <PageWrapper>
      <Lottie animationData={Preloader} />
    </PageWrapper>
  )
}

export default WorldList;