"use client"
import React, { useEffect, useState } from 'react';
import styles from './page.module.scss'
import Link from 'next/link';
import Preloader from '@/public/assets/lotties/Preloader.json';
import Lottie from 'lottie-react';

const dataCollection: React.FC = () => {
  const [aboutData, setAboutData] = useState<string>("");
  const [dataPaths, setDataPaths] = useState<string>("");
  const [why, setWhy] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/repos/caseapia/trainingchecker/contents/src/shared/documents'
        )
        const files = await response.json();
        const markdownFiles = files.filter((file: any) => file.name.endsWith('.md'))

        for (const file of markdownFiles) {
          const fileResponse = await fetch(file.download_url);
          const text = await fileResponse.text();

          if (file.name === 'aboutData.md') {
            setAboutData(text);
          } else if (file.name === 'why.md') {
            setWhy(text);
          } else if (file.name === 'dataPaths.md') {
            setDataPaths(text);
          }
          setIsLoaded(true);
        }
      } catch (e) {
        console.error('Error fetching about data:', e);
      }
    }

    fetchAboutData();
  }, [])

  return isLoaded ? (
    <div className={styles.PageWrapper}>
      <h1>Политика сбора метрик</h1>
      <div className={styles.tab}>
        <h3>Эта страница покрывает следующие пункты:</h3><br />
        <strong>Политика конфиденциальности:</strong>
        <ul className={styles.list}>
          <li><Link href="#about-data">Какие данные мы собираем о вас?</Link></li>
          <li><Link href="#data-paths">Куда уходят собираемые данные?</Link></li>
          <li><Link href="#why">Зачем мы собираем эти данные и как используем их?</Link></li>
        </ul>
      </div>
      <div className={styles.tab} id='about-data'>
        <h3>Какие данные мы собираем о вас?</h3>
        <p>{aboutData}</p>
      </div>
      <div className={styles.tab} id='data-paths'>
        <h3>Куда уходят собираемые данные?</h3>
        <p>{dataPaths}</p>
      </div>
      <div className={styles.tab} id='why'>
        <h3>Зачем мы собираем эти данные и как используем их?</h3>
        <p>{why}</p>
      </div>
    </div>
  ) : (
    <div className={styles.PageWrapper}>
      <Lottie animationData={Preloader} />
    </div>
  )
}

export default dataCollection;