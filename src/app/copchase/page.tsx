"use client";
import React, {useEffect, useState} from 'react';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { Table, Thead, Tr, Td, Th, TBody } from '@/components/Table/Table';
import Loader from "@/modules/Loader/Loader";
import Types from './types';
import styles from './page.module.scss';
import {toast} from "@/utils/toast";

const Page = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [chData, setChData] = useState<Types[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = process.env["NEXT_PUBLIC_COPCHASE_URL"];

      if (!url) {
        console.error("URL is undefined")
        setIsLoaded(false);
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
          toast.error(`Произошла ошибка сервера при обработке запроса: ${response.status} ${response.statusText}`, {
            title: 'Ошибка',
            lifeTime: 10000,
          });
          setIsLoaded(false);
        }
        const data = await response.json();
        if (Array.isArray(data.lobbies)) {
          const output = data.lobbies.map((lobby: any) => ({
            id: Number(lobby.number),
            status: lobby.status,
            time: lobby.time,
            rating: lobby.rating,
            players: Number(lobby.players),
          }));
          setChData(output);
          console.log(output)
          setIsLoaded(true);
        } else {
          console.error("Unexpected data format")
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [])

  const getStatus = (id: number) => {
    const data = chData.find((item) => item.id === id);

    if (!data) return null;

    switch (data.status.trim()) {
      case 'Подбор':
        return <span className={styles.status__recruitment}>Подбор</span>
      case 'В игре':
        return <span className={styles.status__active}>В игре</span>
      case '':
        return <span className={styles.status__waiting}>Ожидание игроков</span>
      default:
        return <span className={styles.status__waiting}>Ожидание игроков</span>
    }
  }

  return isLoaded ? (
    <PageWrapper title="Мониторинг копчейза">
      <Table>
        <Thead>
          <Tr>
            <Th>Номер</Th>
            <Th>Статус</Th>
            <Th>Время</Th>
            <Th>Рейтинг</Th>
            <Th>Игроков</Th>
          </Tr>
        </Thead>
        <TBody>
          {chData.map((item, index) => (
            <Tr key={index}>
              <Td>{item.id}</Td>
              <Td>{getStatus(item.id)}</Td>
              <Td>{item.time || "0:00"}</Td>
              <Td>{item.rating}</Td>
              <Td>{item.players}</Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </PageWrapper>
  ) : <Loader/>;
};

export default Page;