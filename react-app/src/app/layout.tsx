"use client"
import "./globals.css";
import { Header } from "../components/Header/Header";
import Notify from "../components/Notify/Notify";
import { useState } from "react";

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
    <html lang="en">
      <body>
        <Header />
        {children}
        {/* <Notify type="success" handleClose={handleClose} handleOpen={handleOpen}>
            asd
        </Notify>
        <button onClick={handleOpen}>Open</button> */}
      </body>
    </html>
  );
}
