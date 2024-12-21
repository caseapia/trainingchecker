"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense  } from 'react';
import styles from './page.module.scss';
import { BadgeRenderer } from '@/components/BadgeRenderer/BadgeRenderer';
import Button from '@/components/Buttons/Button';
import { HiRefresh } from "react-icons/hi";
import { FaCheckCircle, FaCopy, FaHammer } from 'react-icons/fa';
import { Modal } from '@/components/Modal/Modal';
import Link from 'next/link';
import { Table, Thead, Tr, Td, TBody, Th } from '@/components/Table/Table';
import { useRouter } from 'next/navigation';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { toast } from '@/utils/toast';
import Loader from '@/modules/Loader/Loader';
import Chip from '@/components/Chip/Chip';
import { usePage500 } from '@/shared/hooks/page500';

type PlayerData = {
  id: number;
  login: string;
  access: number;
  moder: number;
  verify: number;
  verifyText: string;
  mute: number;
  online: number;
  regdate: string;
  lastlogin: string;
  playerid: number;
  warn: Array<{ reason: string; bantime: string; admin: string; }>;
}

const PlayerInfo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nickname = searchParams.get('nickname');
  const [playerData, setPlayerData] = useState<PlayerData>({
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
    playerid: NaN,
    warn: []
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [diffInDays, setDiffInDays] = useState(NaN);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isNoAccess, setIsNoAccess] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const triggerPage500 = usePage500();
  let timeoutId: NodeJS.Timeout;

  useEffect(() => {
    if (nickname === null || nickname === '') {
      router.push('../');
      toast.error('Страница не может быть открыта без указания конкретного игрока, переносим вас обратно...', { 
        title: 'Ошибка', 
        lifeTime: 5000 
      })
      clearTimeout(timeoutId);
    }
  }, [searchParams, router]);

  const fetchPlayerData = async () => {
    if (!nickname) return;
    const url = `${process.env.NEXT_PUBLIC_API_USER_URL}/${nickname}`;

    if (!url) {
      throw new Error('Url is not defined')
    }
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setIsDataLoaded(false);
        setIsNoAccess(true);
        if (response.status === 404) {
          router.push('../');
          toast.error(`Игрок с никнеймом ${nickname} не найден. Перенаправляем вас на главную страницу`, { 
            title: 'Игрок не найден', 
            lifeTime: 5000 
          })
          clearTimeout(timeoutId);
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
        warn: result.data.warn as Array<{ reason: string; bantime: string; admin: string; }>,
      });
      setIsDataLoaded(true);
      clearTimeout(timeoutId);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    timeoutId = setTimeout(() => {
      if (!isLoaded) {
        triggerPage500();
      }
    }, 8000);
    fetchPlayerData();
  }, [nickname]);
  
  const refreshData = () => {
    fetchPlayerData();
    toast.success(`Информация об игроке ${playerData.login} была обновлена`, { title: "Успешно!", lifeTime: 5000 })
  };

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
      if (isDataLoaded === true) {
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const copyPunishments = () => {
    if (playerData.warn.length > 0) {
      const punishments = playerData.warn
        .map(warn => `${warn.admin} // ${warn.reason} // ${warn.bantime}`)
        .join(';\n');
      const punishmentsCount = playerData.warn.length;
      navigator.clipboard.writeText(`Список наказаний ${playerData.login} (${playerData.id})\n\n${punishments}\n\nВсего наказаний: ${punishmentsCount}`);
      toast.success(`Наказания игрока ${playerData.login} были помещены в ваш буфер обмена`, { 
        title: "Данные о наказаниях скопированы",
        lifeTime: 5000, 
      })
    } else {
      toast.error(`Игрок ${playerData.login} не имеет наказаний`, { title: "Ошибка!" })
    }
  }

  const getVerify = () => {
    switch (playerData.verify) {
      case 1: 
        return `Ютубер`
      case 2: 
        return `Автор сообщества (создатель модов)`
      case 3: 
        return `Разработчик`
      case 4: 
        return `Администратор в отставке`
      case 5: 
        return `Спонсор`
      case 6: 
        return `Создатель миров`
      case 7: 
        return `🤨`
      default: 
        return `Нет`
    }
  }

  const getModer = () => {
    if (playerData.moder >= 998) {
      return 'Администратор';
    }

    switch (playerData.moder) {
      case 1:
        return 'Младший модератор';
      case 2:
        return 'Модератор';
      case 3:
        return 'Старший модератор';
      default:
        return 'Игрок';
    }
  }
  const getColor = () => {
    if (playerData.moder >= 1 && playerData.moder <= 998) {
      return '#0f4c816c';
    } else if (playerData.moder >= 998) {
      return '#B72A2A6c';
    }
  }

  return isLoaded ? (
    <>
      <div className={styles.ResultWrapper}>
        <p><strong>ID:</strong> {playerData.id}</p>
        <p><strong>Ник:</strong> {playerData.login}</p>
        <strong>Должность:</strong> <Chip label={getModer()} color={getColor()} />
        <p><strong>Верификация:</strong> {`${getVerify()} (ID: ${playerData.verify})`}</p>
        {playerData.verify > 0 && (
          <p><strong>Текст верификации:</strong> {transformVerificationText(playerData.verifyText)}</p>
        )}
        <p><strong>Время мута:</strong> {playerData.mute ? `${playerData.mute}` : <span style={{ color: '#91ec66e7' }}>Нет</span>}</p>
        <p><strong>Дата регистрации:</strong> 
          {
            playerData.regdate === '1970-01-01 03:00:00'
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
        <div className={styles.ButtonGroup}>
          <Button btnType="Secondary" text="Обновить" type="button" icon={ <HiRefresh /> } onClick={refreshData} />
          {playerData.warn.length > 0 ? <Button btnType="Secondary" text="Наказания" type="button" disabled={false} icon={ <FaHammer /> } onClick={openModal} /> : <Button btnType="Secondary" text="Наказания" type="button" disabled={true} icon={ <FaHammer /> } onClick={openModal} />}
        </div>
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={`Список наказаний ${playerData.login} (${playerData.id})`} 
        firstButtonContent='Закрыть' 
        firstButtonIcon={<FaCheckCircle />} 
        firstButtonAction={closeModal}
        secondButtonContent='Скопировать' 
        secondButtonIcon={<FaCopy />}
        secondButtonAction={copyPunishments}
      >
        {playerData.warn.length > 0 ? (
          <Table width={100}>
            <Thead>
              <Tr>
                <Th>Администратор</Th>
                <Th>Причина</Th>
                <Th>Дата</Th>
              </Tr>
            </Thead>
            <TBody>
              {playerData.warn.map((warn, index) => (
                <Tr key={index}>
                  <Td><Link href={`?nickname=${warn.admin}`} onClick={closeModal}>{warn.admin}</Link></Td>
                  <Td>{warn.reason}</Td>
                  <Td>{new Date(warn.bantime).toLocaleString()}</Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        ) : <p style={{ color: 'var(--color-danger)', textAlign: 'center' }}>У этого игрока нет наказаний</p>}
      </Modal>
    </>
  ) : (
    <>
      <Loader />
    </>
  );
}

const Result = () => (
  <PageWrapper>
    <h1>Информация об игроке</h1>
    <Suspense fallback={<Loader />}>
      <PlayerInfo />
    </Suspense>
  </PageWrapper>
);

export default Result;
