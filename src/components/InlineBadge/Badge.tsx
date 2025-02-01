import React, { useEffect, useState } from 'react';
import Props from './types';
import styles from './Badge.module.scss';
import types from './Types.module.scss';
import sizes from './Sizes.module.scss';
import Lottie from 'lottie-react';
import LoadingIcon from '@/icons/LoadingIcon.json';

const Badge = ({
	handler,
	content,
	additionalClass = '',
	type = "default",
	isLoading,
	size = "small",
}: Props) => {
	const [handlerContent, setHandlerContent] = useState("");
	
	const changeHandlerContent = () => {
		setHandlerContent(`${handler}`);
	};
	
	useEffect(() => {
		changeHandlerContent();
	}, [handler]);
	
	return (
		<div className={`${styles.Badge} ${types[type]} ${sizes[size]} ${additionalClass}`}>
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
