"use client"
import "./globals.css";
import { Header } from "../components/Header/Header";
import Notify from "../components/Notify/Notify";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpened(false);
  }
  const handleOpen = () => {
    setIsOpened(true);
  }

  return (
    <html lang="ru">
      <head>
        <link rel="shortcut icon" href="/assets/icons/favicon.png" type="image/x-icon" />
        <title>TRAINING CHECKER</title>
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
