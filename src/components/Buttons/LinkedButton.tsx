import {forwardRef, MouseEvent} from "react";
import {LinkedButtonProps} from "@/components/Buttons/types";
import Link from "next/link";
import {useGenerateId} from "@/hooks/useGenerateId";

import styles from "./Button.module.scss";
import btnTypes from "@/components/Buttons/types.module.scss";
import btnRadius from './radius.module.scss';
import btnSizes from './sizes.module.scss';
import btnGlowes from './glow.module.scss';

const LinkedButton = forwardRef<HTMLAnchorElement, LinkedButtonProps>((
	{
		icon: Icon,
		href,
		type = 'default',
		classname,
		style,
    ariaLabelledBy,
		text,
		target = '_self',
		disabled = false,
		radius = 'medium',
		size = 'full',
		onClick,
		children,
		ripple = true,
		glow,
		...props
  }, ref) => {
		const id = useGenerateId(6);

		const handleRipple =  (e: MouseEvent<HTMLAnchorElement>) => {
			const button = e.currentTarget;
			const ripple = document.createElement('span');
			const rect = button.getBoundingClientRect();

			const size = Math.max(rect.width, rect.height);
			const x = e.clientX - rect.left - size / 2;
			const y = e.clientY - rect.top - size / 2;

			ripple.style.width = ripple.style.height = `${size}px`;
			ripple.style.left = `${x}px`;
			ripple.style.top = `${y}px`;
			ripple.className = styles.ripple;

			button.appendChild(ripple);

			ripple.addEventListener('animationend', () => {
				ripple.remove();
			});
		}
		const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
			if (!disabled) {
				onClick?.(e);
			} else {
				e.preventDefault();
			}
		}
		const handleMouseDown = (e: MouseEvent<HTMLAnchorElement>) => {
			if (!disabled && ripple) {
				handleRipple(e);
			} else {
				return;
			}
		}

		return (
			<Link
				href={href}
				className={`${styles.button} ${btnTypes[type]} ${btnGlowes[glow] || ''} ${btnRadius[radius]} ${btnSizes[size]} ${classname || ''} ${disabled ? btnTypes.disabled : ''}`}
				style={style}
				onMouseDown={handleMouseDown}
				role="button"
				id={id}
				aria-label={text}
				aria-labelledby={ariaLabelledBy}
				ref={ref}
				target={target}
				onClick={handleClick}
				draggable="false"
				data-ripple={ripple}
				{...props}
			>
				<span className={styles.iconContainer}>
					{Icon && <Icon className={styles.icon} />}
				</span>
				<span className={styles.textContainer}>
					{text && text}
				</span>
        <span>
					{children && children}
        </span>
			</Link>
		);
	}
);

export default LinkedButton;