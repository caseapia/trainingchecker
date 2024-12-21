interface Props {
  title?: string;
  children: React.ReactNode;
  className?: string;
  isOpen: boolean; 
  firstButtonIcon?: React.FC<React.SVGProps<SVGElement>>;
  firstButtonContent?: string;
  firstButtonAction?: () => void;
  secondButtonIcon?: React.FC<React.SVGProps<SVGElement>>;
  secondButtonContent?: string;
  secondButtonAction?: () => void;
  onClose: () => void;
  titleClass?: string;
  titleStyle?: React.CSSProperties;
}

export default Props;