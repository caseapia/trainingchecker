"use client"
import { Suspense, useEffect, useState } from 'react';
import styles from './page.module.scss'
import Preloader from '../../../public/assets/lotties/Preloader.json';
import Lottie from 'lottie-react';

const WorldList = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const getWorlds = async () => {
      const url = process.env.NEXT_PUBLIC_API_WORLDLIST_URL;

      if (!url) {
        console.debug('API URL is not defined');
        setIsLoaded(false);
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.debug(response);
        setIsLoaded(true);
      } catch (err) {
        console.error('Error:', err);
      }
    }

    getWorlds();
  }, [])

  return isLoaded ? (
    <Suspense>
      <div className={styles.PageWrapper}>
        <h1>Список открытых миров</h1>
      </div>
    </Suspense>
  ) : (
    <div className={styles.PageWrapper}>
      <Lottie animationData={Preloader} />
    </div>
  )
}

export default WorldList;