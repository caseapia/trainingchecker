import React, { ReactNode, FC, CSSProperties } from "react";

interface Props {
  title?: string;
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  firstButtonIcon?: FC<React.SVGProps<SVGElement>>;
  firstButtonContent?: string;
  firstButtonAction?: () => void;
  secondButtonIcon?: FC<React.SVGProps<SVGElement>>;
  secondButtonContent?: string;
  secondButtonAction?: () => void;
  onClose: () => void;
  titleClass?: string;
  titleStyle?: CSSProperties;
  closeButton?: boolean;
  classNameBody?: string;
}

export default Props;