import React, { FC } from "react";
import ButtonProps from "@/shared/components/ui/button/types";
import Link from "next/link";
import Button from "@/shared/components/ui/button/Button";
import Color from "@/shared/styles/tokens";

interface LinkedButton extends ButtonProps {
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

const LinkedButton: FC<LinkedButton> = ({ href, target, ...props }) => {
  return (
    <Link href={href} target={target} draggable="false" className={Color.defaultText()}>
      <Button {...props} />
    </Link>
  );
};

export default LinkedButton;