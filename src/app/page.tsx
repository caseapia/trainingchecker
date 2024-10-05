"use client"
import { useState, useEffect } from 'react';
import styles from './page.module.scss';
import iStyles from '@/components/Inputs/Input.module.scss';
import tStyles from '@/components/Toast/Toast.module.scss'
import { Input } from '@/components/Inputs/Input';
import { Button } from '@/components/Buttons/Button';
import { Toast } from '@/components/Toast/Toast';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';

const username = 'caseapia';
const repo = 'trainingchecker';

export default function Page() {
    const [aboutSite, setAboutSite] = useState('');
    const [lastUpdate, setLastUpdate] = useState('');
    const [toastContent, setToastContent] = useState('');

    const getReadme = async () => {
        try {
            const response = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/README.md`, {
                headers: {
                    Accept: 'application/vnd.github.v3.raw'
                }
            });

            if (!response.ok) {
                throw new Error(`Error fetching the README file: ${response.statusText}`);
            }

            const content = await response.text();
            setAboutSite(content);

            const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
            if (!commitsResponse.ok) {
                throw new Error(`Error fetching commits: ${commitsResponse.statusText}`);
            }

            const commitsData = await commitsResponse.json();
            if (commitsData.length > 0) {
                const lastCommitDate = new Date(commitsData[0].commit.committer.date).toLocaleDateString();
                const lastCommitMessage = commitsData[0].commit.message;
                setLastUpdate(`${lastCommitDate}`);
                const element = document.getElementById('lastCommit');
                if (element) {
                    element.title = `${lastCommitMessage}`;
                }
            } else {
                setLastUpdate('Последние обновления не найдены');
            }
        } catch (error) {
            console.error(error);
            setLastUpdate('Последние обновления не найдены');
        }
    }

    useEffect(() => {
        getReadme();
    }, []);
    const inputValidation = (e: React.FormEvent) => {
        const input = document.getElementById('nickname') as HTMLInputElement | null;
        const btn = document.getElementById('btn') as HTMLButtonElement;
        const toast = document.getElementById('toast') as HTMLElement;
        const form = document.getElementById('form') as HTMLFormElement;

        if (input && input.value === '') {
            setToastContent('Поле никнейма не должно быть пустым');
            input.classList.add(iStyles.error);
            toast.classList.add(tStyles.active);
            btn.disabled = true;
        } else if (input && /[а-яё]/i.test(input.value)) {
            setToastContent('Никнейм не должен содержать кириллические символы');
            input.classList.add(iStyles.error);
            toast.classList.add(tStyles.active);
            btn.disabled = true;
        } else {
            input?.classList.remove(iStyles.error);
            toast.classList.remove(tStyles.active);
            btn.disabled = false;
        }
    }

    return (
        <main>
            <Toast toastType='danger' icon={ <MdError /> }>
                {toastContent}
            </Toast>
            <div className={styles.container}>
                <div className={styles.info}>
                    <p className={styles.aboutsite} dangerouslySetInnerHTML={{ __html: aboutSite }} />
                    <p className={styles.update}>Последнее публичное обновление этого ресурса было: <span id='lastCommit' className={styles.lastCommit} dangerouslySetInnerHTML={{ __html: lastUpdate }} /></p>
                </div>
                <form action="./result" method="get" className={styles.inputcontainer} id='form'>
                    <Input label='Введите никнейм игрока' name='nickname' type='text' placeholder='Введите никнейм игрока' id={'nickname'} onInput={inputValidation} />
                    <Button spec='primary' type='submit' icon={ <FaMagnifyingGlass /> } disabled={true} id='btn'>Найти</Button>
                </form>
            </div>
        </main>
    )
}