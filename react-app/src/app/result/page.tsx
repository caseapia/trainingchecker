"use client"
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.scss'
import BadgeRenderer from '@/components/BadgeRenderer/BadgeRenderer';

const Result = () => {
  const searchParams = useSearchParams();
  const nickname = searchParams.get('nickname');
  const [playerData, setPlayerData] = useState({
    id: NaN,
    login: '',
    access: NaN,
    moder: NaN,
    verify: NaN,
    verifyText: '',
    mute: NaN,
    online: NaN,
    regdate: '',
    lastlogin: '',
    playerid: NaN
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
          id: Number(result.data.id),
          login: result.data.login,
          access: Number(result.data.access),
          moder: Number(result.data.moder),
          verify: Number(result.data.verify),
          verifyText: result.data.verifyText,
          mute: Number(result.data.mute),
          online: Number(result.data.online),
          regdate: result.data.regdate,
          lastlogin: result.data.lastlogin,
          playerid: Number(result.data.playerid),
        });
        console.log(result.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPlayerData();
  }, [])
  const transformVerificationText = (text: string) => {
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

  return (
    <div className={styles.PageWrapper}>
      <h1>Информация об игроке</h1>
      <div className={styles.ResultWrapper}>
        <p><strong>ID:</strong> {playerData.id}</p>
        <p><strong>Ник:</strong> {playerData.login}</p>
        <p><strong>Должность:</strong> {" "}
          {
            playerData.moder < 0 
            ? "Младший уборщик унитаза Волека"
            : playerData.moder === 0 
            ? "Игрок"
            : playerData.moder === 1
            ? "Младший модератор"
            : playerData.moder === 2
            ? "Модератор"
            : playerData.moder === 3
            ? "Старший модератор"
            : playerData.moder > 998 
            ? "Администратор"
            : "Игрок"
          }
        </p>
        <p><strong>Верификация:</strong> 
          {
            playerData.verify === 0
            ? ` Нет`
            : playerData.verify === 1
            ? ` Ютубер`
            : playerData.verify === 2
            ? ` Автор сообщества (маппер)`
            : playerData.verify === 3
            ? ` Разработчик`
            : playerData.verify === 4
            ? ` Автор сообщества (Модели и прочее)`
            : playerData.verify === 5
            ? ` Донатер`
            : playerData.verify === 6
            ? ` Администратор в отставке`
            : playerData.verify > 6
            ? ` Неизвестно`
            : `Нет`
          }
          {` (ID: ${playerData.verify})`}
        </p>
        {playerData.verify > 0 && (
          <p><strong>Текст верификации:</strong> {transformVerificationText(playerData.verifyText)}</p>
        )}
        <p><strong>Время мута:</strong> {playerData.mute ? `${playerData.mute}` : <span style={{ color: '#91ec66e7' }}>Нет</span>}</p>
        <p><strong>Онлайн:</strong> {playerData.online ? <span style={{ color: '#91ec66e7' }}>Да <span style={{ color: 'white' }}>(ID: {playerData.playerid})</span></span> : <span style={{ color: '#f01f4be7' }}>Нет</span>}</p>
        <p><strong>Дата регистрации:</strong> {playerData.regdate}</p>
        <p><strong>Дата последнего входа:</strong> {playerData.lastlogin}</p>
        <hr className={styles.ProfileLine} />
        <h5 className={styles.h5}>Значки</h5>
        <BadgeRenderer player={playerData} />
        {/* <hr className={styles.ProfileLine} />
        <h5 className={styles.h5}>Список наказаний</h5> */}
      </div>
    </div>
  );
}

export default Result;