"use client"
import { useState, useEffect } from 'react';
import styles from './result.module.scss';
import { Button } from '@/components/Buttons/Button';
import { FaRepeat } from 'react-icons/fa6';
import { useSearchParams } from 'next/navigation';
import { Toast } from '@/components/Toast/Toast';
import tStyles from '@/components/Toast/Toast.module.scss'
import { ImCheckboxChecked } from "react-icons/im";

export default function Page() {
    const [id, setId] = useState('Загрузка');
    const [rank, setRank] = useState('Загрузка');
    const [verify, setVerify] = useState('Загрузка');
    const [verifyText, setVerifyText] = useState('Загрузка');
    const [muteTime, setMuteTime] = useState('Загрузка');
    const [status, setStatus] = useState('Загрузка');
    const [displayNick, setDisplayNick] = useState('Загрузка');
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [toastContent, setToastContent] = useState<string>('');

    const searchParams = useSearchParams();

    useEffect(() => {
        const nicknameFromQuery = searchParams.get('nickname');
        console.log('Nickname from query:', nicknameFromQuery);

        if (nicknameFromQuery) {
            setNickname(nicknameFromQuery);
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchNicknameData = async () => {
            if (nickname) {
                console.log('Fetching data for nickname:', nickname);
                await fetchData();
            }
        };
        fetchNicknameData();
    }, [nickname]);
    

    const fetchData = async () => {
        const url = `https://training-server.com/api/user/${nickname}`;
        console.log('Fetching data from URL:', url);
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Network response was not OK: ${response.status}`);
            }
            const result = await response.json();
            returnUserData(result);
            setError(null);
        } catch (error) {
            console.error("Error fetching userdata:", error);
            setError("Произошла ошибка при загрузке данных.");
        }
    }
    
    const returnUserData = (response: any) => {
        const data = response.data;
        console.log('Processing data:', data);
    
        setId(data.id || 'Не указано');
        setDisplayNick(data.login || 'Ошибка');
        setRank(data.moder ? "Модератор" : "Игрок");
        setVerify(data.verify || 0);
        setVerifyText(data.verifyText || "Нет");
        setMuteTime(data.mute || "Нет");
        setStatus(data.online === 0 ? "Не в сети" : "В сети");
    }
    
    
    
    

    const handleRefresh = () => {
        console.log('Refreshing data');
        setToastContent('Данные обновлены');
        document.getElementById('toast')?.classList.add(tStyles.active);
        fetchData();
    }

    return (
        <main>
            <Toast toastType='success' icon={<ImCheckboxChecked />}>
                {toastContent}
            </Toast>
            <div className={styles.container}>
                <div className={styles.infocontainer}>
                    <div className={styles.buttoncontainer}>
                        <Button spec='secondary' type='button' icon={ <FaRepeat /> } onClick={handleRefresh}>Обновить</Button>
                    </div>
                    <div className={styles.content}>
                        {error && <div className={styles.error}>{error}</div>}
                        <ul>
                            <li>
                                <label>ID:</label> <span>{id}</span>
                            </li>
                            <li>
                                <label>Никнейм:</label> <span>{displayNick}</span>
                            </li>
                            <li>
                                <label>Должность:</label> <span>{rank}</span>
                            </li>
                            <li>
                                <label>Верификация:</label> <span>{verify}</span>
                            </li>
                            <li>
                                <label>Текст верификации:</label> <span>{verifyText}</span>
                            </li>
                            <li>
                                <label>Время мута:</label> <span>{muteTime}</span>
                            </li>
                            <li>
                                <label>Статус:</label> <span>{status}</span>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </main>
    )
}