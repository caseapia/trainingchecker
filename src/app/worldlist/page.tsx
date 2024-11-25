"use client"
import { Suspense, useEffect, useState } from 'react';
import styles from './page.module.scss'
import Preloader from '../../../public/assets/lotties/Preloader.json';
import Lottie from 'lottie-react';
import { Table, Thead, Tr, Td, Th, TBody } from '@/components/Table/Table';
import Chip from '@/components/Chip/Chip';
import { FaBookmark } from "react-icons/fa6";
import { GoCpu, GoAlertFill } from "react-icons/go";

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

  useEffect(() => {
    const getWorlds = async () => {
      const url = process.env.NEXT_PUBLIC_API_WORLDLIST_URL;

      if (!url) {
        console.debug('API URL is not defined');
        setIsLoaded(false);
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.debug(data);
        setResult(data.worlds);
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

  return isLoaded ? (
    <Suspense>
      <div className={styles.PageWrapper}>
        <h1>Список открытых миров</h1>
        <Table width={50}>
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
      </div>
    </Suspense>
  ) : (
    <div className={styles.PageWrapper}>
      <Lottie animationData={Preloader} />
    </div>
  )
}

export default WorldList;