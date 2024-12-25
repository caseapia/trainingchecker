import React, { FC } from 'react';

export type ButtonIcon = FC<React.SVGProps<SVGElement>>;
export type ButtonTypes = "Primary" | "Transparent" | "Secondary" | "Danger" | "Outlined" | "Violet";
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
  ariaLabel?: string;
  ariaLabelledBy?: string;
}

interface LinkedButtonProps {
	href: string;
	icon?: ButtonIcon;
	type: ButtonTypes;
	text?: string;
	disabled?: boolean;
	classname?: string;
	style?: React.CSSProperties;
	ariaLabel?: string;
	ariaLabelledBy?: string;
	target?: '_blank' | '_self' | '_parent' | '_top';
}

export default Props;
export type {LinkedButtonProps};