import { FC, useState } from 'react'
import styles from './Preloader.module.scss'
import Image from 'next/image';
import traininglogo from '../../../public/assets/images/training-logo.jpg'

export const Preloader:FC = () => {
  const [show, setShow] = useState<boolean>(true);

  setTimeout(() => {
    setShow(false);
  }, 1000);

  return (
    <>
      {show && 
        (
          <div className={styles.preloader}>
            <Image src={traininglogo} alt='Training Logotype' />
          </div>
        )
    }
    </>
  )
}