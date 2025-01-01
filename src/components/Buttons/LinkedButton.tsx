import {forwardRef} from "react";
import {LinkedButtonProps} from "@/components/Buttons/types";
import Link from "next/link";
import styles from "./Button.module.scss";
import {useGenerateId} from "@/hooks/useGenerateId";
import btnTypes from "@/components/Buttons/types.module.scss";
import btnRadius from './radius.module.scss';
import btnSizes from './sizes.module.scss';

const LinkedButton = forwardRef<HTMLAnchorElement, LinkedButtonProps>((
	{
		icon: Icon,
		href,
		type = 'default',
		classname,
		style,
		ariaLabel,
    ariaLabelledBy,
		text,
		target = '_self',
		radius = 'medium',
		size = 'full',
		onClick,
		children,
  }, ref) => {
		const id = useGenerateId();
		return (
			<Link
				href={href}
				className={`${styles.button} ${btnTypes[type]} ${btnRadius[radius]} ${btnSizes[size]} ${classname || ''}`}
				style={style}
				role="button"
				id={id}
				aria-label={ariaLabel}
				aria-labelledby={ariaLabelledBy}
				ref={ref}
				target={target}
				onClick={onClick}
				draggable="false"
			>
        <span>
          {Icon && <Icon className={styles.icon} />}
	        {text && text}
					{children && children}
        </span>
			</Link>
		);
	}
);

export default LinkedButton;