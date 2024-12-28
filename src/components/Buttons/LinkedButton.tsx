import {forwardRef} from "react";
import {LinkedButtonProps} from "@/components/Buttons/types";
import Link from "next/link";
import styles from "./Button.module.scss";
import {useGenerateId} from "@/hooks/useGenerateId";
import btnTypes from "@/components/Buttons/buttonTypes.module.scss";
import btnRadius from './buttonRadius.module.scss';
import btnSizes from './buttonSizes.module.scss';

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
			>
        <span>
          {Icon && <Icon className={styles.icon} />}
	        {text && text}
        </span>
			</Link>
		);
	}
);

export default LinkedButton;