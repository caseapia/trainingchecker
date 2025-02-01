import React from 'react';
import Lottie from 'lottie-react';
import styles from './Loader.module.scss';
import Props from './types';
import settings from '@/consts/settings';

// Files
import WinterLoader from '@/public/assets/lotties/WinterLoader.json';
import Preloader from '@/public/assets/lotties/Preloader.json';

const Loader = ({ variant }: Props) => {
	const defaultVariant = settings.find(s => s.option === 'preloader')?.value || 'default';

	const getVariant = () => {
		switch (variant || defaultVariant) {
			case 'winter':
				return WinterLoader;
			default:
				return Preloader;
		}
	};

	return (
		<div className={styles.LoadWrapper}>
			<Lottie
				animationData={getVariant()}
				style={{ height: '200px', width: '200px' }}
			/>
		</div>
	);
};

export default Loader;
