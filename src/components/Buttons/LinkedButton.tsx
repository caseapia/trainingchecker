import {forwardRef} from "react";
import {LinkedButtonProps} from "@/components/Buttons/types";
import Link from "next/link";
import styles from "./Button.module.scss";
import {useGenerateId} from "@/hooks/useGenerateId";
import buttonTypes from "@/components/Buttons/buttonTypes.module.scss";

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
  }, ref) => {
		const id = useGenerateId();
		return (
			<Link
				href={href}
				className={`${styles.button} ${buttonTypes[type]} ${classname || ''}`}
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