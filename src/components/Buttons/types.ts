import { FC } from 'react';

export type ButtonIcon = FC<React.SVGProps<SVGElement>>;
export type ButtonTypes = "Primary" | "Transparent" | "Secondary" | "Danger" | "Outlined";
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
}

export default Props;