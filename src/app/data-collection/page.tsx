"use client"
import React, { useEffect, useState } from 'react';
import styles from './page.module.scss'
import Link from 'next/link';
import { marked } from 'marked';

const dataCollection: React.FC = () => {
  const [aboutData, setAboutData] = useState<string>("");
  const [dataPaths, setDataPaths] = useState<string>("");
  const [why, setWhy] = useState<string>("");

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/caseapia/caseapia/main/src/shared/documents/aboutData.md'
        )
        const text = await response.text();
        const htmlContent = marked(text);
        setAboutData(`${htmlContent}`);
      } catch (e) {
        console.error('Error fetching about data:', e);
      }
    }


    fetchAboutData();
  }, [])

  return (
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
      </div>
    </div>
  )
}

export default dataCollection;