import React, { FC } from "react";

export type ButtonIcon = FC<React.SVGProps<SVGElement>>;
export type ButtonTypes = "Primary" | "Transparent" | "Secondary" | "Danger" | "Outlined" | "Violet";
export type Radius = "squared" | "small" | "medium" | "large" | "extra-large" | "rounded";
export type Sizes = "small" | "medium" | "large" | "full";
export type GlowVariants = "blue" | "red";
export type ButtonActions = "submit" | "reset" | "button";

interface ButtonProps {
  icon?: ButtonIcon;
  type: ButtonTypes;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  action?: ButtonActions;
  disabled?: boolean;
  classname?: string;
  style?: React.CSSProperties;
  isLoading?: boolean;
  ariaLabelledBy?: string;
  radius?: Radius;
  size?: Sizes;
  ripple?: boolean;
  glow?: GlowVariants;
  children: React.ReactNode;

  [key: string]: any;
}

export default ButtonProps;