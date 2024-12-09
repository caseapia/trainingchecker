interface Props {
  icon?: React.ReactNode;
  btnType: "Primary" | "Transparent" | "Secondary" | "Danger";
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  type: "submit" | "reset" | "button";
  disabled?: boolean;
  classname?: string;
  style?: React.CSSProperties;
}

export default Props;