import React from 'react';
import Lottie from 'lottie-react';
import styles from './Loader.module.scss';

// Animations
import WinterLoader from '@/public/assets/lotties/WinterLoader.json';
import Preloader from '@/public/assets/lotties/Preloader.json';


const Loader = () => {
  return (
    <div className={styles.LoadWrapper}>
      <Lottie 
        animationData={WinterLoader}
        style={{ height: '200px', width: '200px' }}
      />
    </div>
  )
}

export default Loader