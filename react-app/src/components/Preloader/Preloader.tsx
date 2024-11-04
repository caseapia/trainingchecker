import { FC, useState, useRef, useEffect } from 'react';
import styles from './Preloader.module.scss';
import Image from 'next/image';
import traininglogo from '../../../public/assets/images/training-logo.jpg';

export const Preloader: FC = () => {
  const [show, setShow] = useState<boolean>(true);
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loader.current?.classList.add(styles.active);
    setTimeout(() => {
      loader.current?.classList.remove(styles.active);
      setTimeout(() => setShow(false), 5000);
    }, 5000);
  }, []);

  return show ? (
    <div className={`${styles.preloader}`} ref={loader}>
      <Image src={traininglogo} alt="Training Logotype" width={150} draggable={false} />
    </div>
  ) : null;
};
