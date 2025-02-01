"use client";
import { useSearchParams } from 'next/navigation';
import {useEffect, useState, Suspense, useCallback} from 'react';
import styles from './page.module.scss';
import { BadgeRenderer } from '@/components/BadgeRenderer/BadgeRenderer';
import Button from '@/components/Buttons/Button';
import CheckIcon from '@/icons/checkCircle.svg';
import CopyIcon from '@/icons/copy.svg';
import HammerIcon from '@/icons/hammer.svg';
import RefreshIcon from '@/icons/page-player/refresh.svg';
import { Modal } from '@/components/Modal/Modal';
import Link from 'next/link';
import { Table, Thead, Tr, Td, TBody, Th } from '@/components/Table/Table';
import { useRouter } from 'next/navigation';
import PageWrapper from '@/components/PageWrapper/PageWrapper';
import { toast } from '@/utils/toast';
import Loader from '@/modules/Loader/Loader';
import Chip from '@/components/Chip/Chip';
import {useTransformTextColor} from "@/hooks/useTransofrmTextColor";
import PlayerData from './types';
import {metric, setMetricInstance} from "@/utils/metric";
import {sendMetric} from "@/hooks/sendMetric";

const PlayerInfo = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nickname = searchParams.get('nickname');
  const [buttonState, setButtonState] = useState<boolean>(false);
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
  const [diffInDays, setDiffInDays] = useState(NaN);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const transformedVerificationText = useTransformTextColor;

  useEffect(() => {
    setMetricInstance(sendMetric);
    // TODO: Добавить более точную информацию о странице
    // metric.send({
    //   action: 'Инициализирован профиль игрока',
    //   additionMessage: `${nickname}`,
    // })
  }, []);
	
	useEffect(() => {
		if (!nickname) {
      // metric.send({
      //   action: 'Пользователь перешел на страницу player без указания игрока',
      //   error: 'Страница не может быть открыта без указания конкретного игрока',
      // });
			router.push('../');
			toast.error('Страница не может быть открыта без указания конкретного игрока, переносим вас обратно...', {
				lifeTime: 5000
			});
		}
	}, [nickname, router]);
	
	const getData = useCallback(async () => {
		if (!nickname) return;
		
		const url = `${process.env.NEXT_PUBLIC_API_USER_URL}/${nickname}`;
		
		try {
			const response = await fetch(url);
			
			if (!response.ok) {
				if (response.status === 404) {
          // metric.send({
          //   action: 'Пользователь ввел несуществующий никнейм',
          //   error: `Игрок с никнеймом ${nickname} не найден`,
          // });
					router.push('../');
					toast.error(`Игрок с никнеймом ${nickname} не найден. Перенаправляем вас на главную страницу`, {
						lifeTime: 5000,
					});
				}
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
				warn: result.data.warn as Array<{ reason: string; bantime: string; admin: string }>,
			});
			setIsLoaded(true);
		} catch (error) {
			console.error(error);
		}
	}, [nickname, router]);

  const refreshData = () => {
    getData();
    toast.success(`Информация об игроке ${nickname} успешно обновлена`, {
      lifeTime: 5000,
    })
    setButtonState(true);
    setTimeout(() => {
      setButtonState(false);
    }, 5000)
    // metric.send({
    //   action: `Обновлена информация об игроке ${nickname}`
    // })
  }
	
	useEffect(() => {
		getData();
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
      navigator.clipboard.writeText(
        `Список наказаний ${playerData.login} (${playerData.id})\n\n${punishments}\n\nВсего наказаний: ${punishmentsCount}`
      );
      toast.success(`Наказания игрока ${playerData.login} были помещены в ваш буфер обмена`, {
        isByModal: true,
      })
    } else {
      toast.error(`Игрок ${playerData.login} не имеет наказаний`,)
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

  return isLoaded ? (
    <>
      <div className={styles.ResultWrapper}>
        <p><strong>ID:</strong> {playerData.id}</p>
        <p><strong>Ник:</strong> {playerData.login}</p>
        <strong>Должность:</strong> <Chip label={getModer()} />
        <p><strong>Верификация:</strong> {`${getVerify()} (ID: ${playerData.verify})`}</p>
        {playerData.verify > 0 && (
          <p><strong>Текст верификации:</strong> {transformedVerificationText(playerData.verifyText)}</p>
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
	      <hr className={styles.ProfileLine}/>
	      <h5 className={styles.h5}>Значки</h5>
	      <BadgeRenderer player={playerData}/>
	      <div className={styles.ButtonGroup}>
          <Button
            type="Secondary"
            text="Обновить"
            action="button"
            icon={RefreshIcon}
            onClick={refreshData}
            disabled={buttonState}
          />
          <Button 
            type='Secondary'
            text='Наказания'
            action='button'
            disabled={playerData.warn.length <= 0}
            onClick={openModal}
            icon={HammerIcon}
          />
        </div>
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={`Список наказаний ${playerData.login} (${playerData.id})`} 
        secondButtonContent='Закрыть'
        secondButtonIcon={CheckIcon}
        secondButtonAction={closeModal}
        firstButtonContent='Скопировать'
        firstButtonIcon={CopyIcon}
        firstButtonAction={copyPunishments}
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
