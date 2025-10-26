import React from "react";

interface Props {
  label: string;
  className?: string;
  size?: "small" | "medium" | "large";
  icon?: React.FC<React.SVGProps<SVGElement>>;
  iconPosition?: "left" | "right";
  iconSize?: number;
  image?: string;
  color?: string;
}

export default Props;