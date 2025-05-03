import React, { FC } from "react";
import ButtonProps from "@/components/button/types";
import Link from "next/link";
import Button from "@/components/button/Button";

interface LinkedButton extends ButtonProps {
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

const LinkedButton: FC<LinkedButton> = ({ href, target, ...props }) => {
  return (
    <Link href={href} target={target} draggable="false">
      <Button {...props} />
    </Link>
  );
};

export default LinkedButton;