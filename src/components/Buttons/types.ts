import React, { FC } from 'react';

export type ButtonIcon = FC<React.SVGProps<SVGElement>>;
export type ButtonTypes = "Primary" | "Transparent" | "Secondary" | "Danger" | "Outlined" | "Violet";
export type Radius = 'squared' | 'small' | 'medium' | 'large' | 'extra-large' | 'rounded';
export type Sizes = 'small' | 'medium' | 'large' | 'full';
export type GlowVariants = 'blue' | 'red';
type ButtonActions = "submit" | "reset" | "button";

interface Props {
  icon?: ButtonIcon;
  type: ButtonTypes;
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  action: ButtonActions;
  disabled?: boolean;
  classname?: string;
  style?: React.CSSProperties;
  isLoading?: boolean;
  ariaLabelledBy?: string;
	radius?: Radius;
	size?: Sizes;
	ripple?: boolean;
	glow?: GlowVariants;
	[key: string]: any;
}

interface LinkedButtonProps {
	href: string;
	icon?: ButtonIcon;
	type: ButtonTypes;
	text?: string;
	disabled?: boolean;
	classname?: string;
	style?: React.CSSProperties;
	ariaLabelledBy?: string;
	target?: '_blank' | '_self' | '_parent' | '_top';
	radius?: Radius;
	size?: Sizes;
	onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
	children?: React.ReactNode;
	ripple?: boolean;
	glow?: GlowVariants;
	[key: string]: any;
}

export default Props;
export type {LinkedButtonProps};