interface Props {
  title?: string;
  children: React.ReactNode;
  className?: string;
  isOpen: boolean; 
  firstButtonIcon?: React.ReactNode;
  firstButtonContent?: string;
  firstButtonAction?: () => void;
  secondButtonIcon?: React.ReactNode;
  secondButtonContent?: string;
  secondButtonAction?: () => void;
  onClose: () => void;
}

export default Props;