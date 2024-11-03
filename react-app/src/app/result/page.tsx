"use client"
import { div } from 'framer-motion/client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.scss'

const Result = () => {
  const searchParams = useSearchParams();
  const nickname = searchParams.get('nickname');
  const [playerData, setPlayerData] = useState({
    id: NaN,
    login: '',
    access: '',
    moder: '',
    verify: '',
    verifyText: '',
    mute: '',
    online: '',
    regdate: '',
    lastlogin: '',
  });
  useEffect(() => {
    const fetchPlayerData = async () => {
      if (!nickname) {
        return;
      }
      const url = `https://training-server.com/api/user/${nickname}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setPlayerData({
          id: result.data.id,
          login: result.data.login,
          access: result.data.access,
          moder: result.data.moder,
          verify: result.data.verify,
          verifyText: result.data.verifyText,
          mute: result.data.mute,
          online: result.data.online,
          regdate: result.data.regdate,
          lastlogin: result.data.lastlogin,
        });
        console.log(result.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPlayerData();
  }, [])

  return (
    <div className={styles.PageWrapper}>
      <h1>Информация об игроке</h1>
      <div className={styles.ResultWrapper}>
        <p>ID: {playerData.id}</p>
        <p>Ник: {playerData.login}</p>
        <p>Уровень доступа: {playerData.access}</p>
        <p>Модератор: {playerData.moder}</p>
        <p>Верификация: {playerData.verify} ({playerData.verifyText})</p>
        <p>Время мута: {playerData.mute}</p>
        <p>Онлайн: {playerData.online ? "Да" : "Нет"}</p>
        <p>Дата регистрации: {playerData.regdate}</p>
        <p>Дата последнего входа: {playerData.lastlogin}</p>
      </div>
    </div>
  );
}

export default Result;