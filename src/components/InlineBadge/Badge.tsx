import React, { useEffect, useState } from 'react';
import Props from './types';
import styles from './Badge.module.scss';
import Lottie from 'lottie-react';
import LoadingIcon from '@/icons/LoadingIcon.json';

const Badge = ({
	handler,
	content,
	additionalClass = '',
	badgeType = "default",
	isLoading,
}: Props) => {
	const [handlerContent, setHandlerContent] = useState("");
	
	const changeHandlerContent = () => {
		setHandlerContent(`${handler}`);
	};
	
	useEffect(() => {
		changeHandlerContent();
	}, [handler]);
	
	return (
		<div className={`${styles.Badge} ${styles[badgeType]} ${additionalClass}`}>
			<span>
				{!isLoading && (
					<>
						{content && content}
						{handler && handlerContent}
					</>
				)}
				{isLoading && (
					<Lottie
						animationData={LoadingIcon}
						className={styles.loading}
					/>
				)}
			</span>
		</div>
	);
};

export default Badge;
