"use client"
import { Suspense, useState } from 'react';
import styles from './page.module.scss'
import Preloader from '../../../public/assets/lotties/Preloader.json';
import Lottie from 'lottie-react';

const WorldList = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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