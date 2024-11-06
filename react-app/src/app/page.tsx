"use client"
import { useEffect, useState, Suspense } from "react";
import styles from "./page.module.scss";
import { Input } from "@/components/Input/Input";
import Button from "@/components/Buttons/Button";
import { FaCheckCircle, FaUser } from "react-icons/fa";
import { BiLogoGithub } from "react-icons/bi";
import Lottie from 'lottie-react';
import Preloader from '../../public/assets/lotties/Preloader.json';

export default function Home() {
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useEffect(() => {
    const commits = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/caseapia/trainingchecker/commits`, {
          headers: {
            'Authorization': `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`,
            'Accept': 'application/vnd.github.v3+json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const cmts = await response.json();
        console.debug(cmts);

        if (Array.isArray(cmts) && cmts.length > 0) {
          const lastcmtday = cmts[0].commit.committer.date;
          console.debug('Last commit date:', lastcmtday);
          const lastUpdate = new Date(lastcmtday).toLocaleString();
          setLastUpdate(lastUpdate);
        }
        setIsLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    commits();
  }, []);

  useEffect(() => {
    document.title = `TRAINING CHECKER`;
  }, [])

  return (
    <>
      <html lang="ru">
        <head>
          <title>TRAINING CHECKER</title>
        </head>
      </html>
      <Suspense fallback={<Lottie animationData={Preloader} />}>
        <div className={styles.container} id="main">
          {isLoaded ?
           (
            <>
              <div className={styles.readmeWrapper}>
              <p style={{textAlign: 'center'}}>SAMP сервер <a href="https://training-server.com/" target="_blank" rel="noopener noreferrer">TRAINING</a> не имеет отношения к созданию данного сайта. Этот сайт является частным и использует<br /><a href="https://forum.training-server.com/d/3921-training-api" target="_blank" rel="noopener noreferrer">TRAINING API</a> в соответствии с разрешением его создателя.</p><br />
              <p>Разработано для упрощения работы с <a href="https://forum.training-server.com/d/3921-training-api" target="_blank" rel="noopener noreferrer">TRAINING API</a>.</p>
              <p>Мы не собираем никаких данных и метрик. Если вы нашли недоработку, пожалуйста, сообщите об этом в теме на форуме.</p>
              <p>Этот проект имеет открытый исходный код, вы всегда можете дополнить его или исправить, используя<br /><a href="https://github.com/1dontkillme/trainingchecker" target="_blank" rel="noopener noreferrer"><BiLogoGithub /> исходный код на GitHub</a>.</p><br />
              <p>Последнее обновление произошло: {lastUpdate}</p>
              </div>
              <form action="./result" method="get" className={styles.FormContainer}>
                <Input icon={<FaUser />} label="Введите никнейм игрока" type="text" name="nickname" />
                <Button btnType="Primary" text="Проверить" type="submit" icon={ <FaCheckCircle /> } />
              </form>
            </>
          ) : (
            <Lottie animationData={Preloader} />
          )
          }
        </div>
      </Suspense>
    </>
  );
}
