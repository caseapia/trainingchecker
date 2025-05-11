import { ReactNode } from "react";

export interface Information {
  title: string;
  key: string | ReactNode;
  className?: string;
}