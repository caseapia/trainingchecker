"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import styles from './page.module.scss';
import BadgeRenderer from '@/components/BadgeRenderer/BadgeRenderer';
import Lottie from 'lottie-react';
import Preloader from '../../../public/assets/lotties/Preloader.json';

const PlayerInfo = () => {
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
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [diffInDays, setDiffInDays] = useState(NaN);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchPlayerData = async () => {
      if (!nickname) return;
      const url = `https://training-server.com/api/user/${nickname}`;
  
      try {
        const response = await fetch(url);
        if (!response.ok) {
          if (response.status === 404) {
            setIsDataLoaded(false);
            setIsNotFound(true);
            return;
          }
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
        setIsDataLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchPlayerData();
  }, [nickname]);

  useEffect(() => {
    if (!playerData.lastlogin) return;
  
    const dates = () => {
      const today = new Date();
      const lastLoginDate = new Date(playerData.lastlogin);
  
      const diffInTime = today.getTime() - lastLoginDate.getTime();
      const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
  
      setDiffInDays(diffInDays);
    };
  
    dates();
  }, [playerData.lastlogin]);

  useEffect(() => {
    const getPageValid = () => {
      if (isDataLoaded === true && isNotFound === false) {
        setIsLoaded(true);
      } else {
        setIsLoaded(false);
      }
    }
    getPageValid();
  })

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

  const getDaySuffix = (days: number) => {
    const lastDigit = days % 10;
    const lastTwoDigits = days % 100;
  
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return "дней";
    if (lastDigit === 1) return "день";
    if (lastDigit >= 2 && lastDigit <= 4) return "дня";
    return "дней";
  };
  return isLoaded ? (
    <>
      <div className={styles.ResultWrapper}>
        <p><strong>ID:</strong> {playerData.id}</p>
        <p><strong>Ник:</strong> {playerData.login}</p>
        <p><strong>Должность:</strong> {playerData.moder < 0 
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
        }</p>
        <p><strong>Верификация:</strong> 
          {playerData.verify === 0
            ? ` Нет`
            : playerData.verify === 1
            ? ` Ютубер`
            : playerData.verify === 2
            ? ` Автор сообщества (создатель модов)`
            : playerData.verify === 3
            ? ` Разработчик`
            : playerData.verify === 4
            ? ` Администратор в отставке`
            : playerData.verify === 5
            ? ` Спонсор`
            : playerData.verify === 6
            ? ` Создатель миров`
            : playerData.verify === 7
            ? ` 🤨`
            : playerData.verify > 7
            ? ` Неизвестно`
            : `Нет`
          }
          {` (ID: ${playerData.verify})`}
        </p>
        {playerData.verify > 0 && (
          <p><strong>Текст верификации:</strong> {transformVerificationText(playerData.verifyText)}</p>
        )}
        <p><strong>Время мута:</strong> {playerData.mute ? `${playerData.mute}` : <span style={{ color: '#91ec66e7' }}>Нет</span>}</p>
        <p><strong>Дата регистрации:</strong> 
          {playerData.regdate === '1970-01-01 03:00:00'
            ? ' Зарегистрирован до 2018 года'
            : ` ${playerData.regdate}`
          }
        </p>
        <p>
          <strong>Дата последнего входа: </strong>
          {new Date(playerData.lastlogin).toDateString() === new Date().toDateString() && playerData.online === 0 ? (
            playerData.lastlogin
          ) : new Date(playerData.lastlogin).toDateString() !== new Date().toDateString() && playerData.online === 0 ? (
            `${playerData.lastlogin} (${diffInDays} ${getDaySuffix(diffInDays)} назад)`
          ) : null}
          {playerData.online ? (
            <span style={{ color: '#91ec66e7' }}>Сейчас в сети <span style={{ color: 'white' }}>(ID: {playerData.playerid})</span></span>
          ) : null}
        </p>
        <hr className={styles.ProfileLine} />
        <h5 className={styles.h5}>Значки</h5>
        <BadgeRenderer player={playerData} />
      </div>
    </>
  ) : isNotFound ? (
    <div className={styles.PageWrapper}>
      <h3>Игрок с никнеймом <span className={styles.nickname}>{nickname}</span> не найден</h3>
    </div>
  ) : (
    <div className={styles.PageWrapper}>
      <Lottie animationData={Preloader} />
    </div>
  );
}

const Result = () => (
  <div className={styles.PageWrapper} id='result'>
    <h1>Информация об игроке</h1>
    <Suspense fallback={<Lottie animationData={Preloader} />}>
      <PlayerInfo />
    </Suspense>
  </div>
);

export default Result;
