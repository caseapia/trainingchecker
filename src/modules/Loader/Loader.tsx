import React from 'react';
import Lottie from 'lottie-react';
import styles from './Loader.module.scss';
import Props from './types';

// Files
import WinterLoader from '@/public/assets/lotties/WinterLoader.json';
import Preloader from '@/public/assets/lotties/Preloader.json';


const Loader =
	({
		variant = 'winter',
	}: Props) => {
	
	const getVariant = () => {
		switch (variant) {
			case 'winter':
				return WinterLoader;
			default:
				return Preloader;
		}
	}
	
  return (
    <div className={styles.LoadWrapper}>
      <Lottie 
        animationData={getVariant()}
        style={{ height: '200px', width: '200px' }}
      />
    </div>
  )
}

export default Loader