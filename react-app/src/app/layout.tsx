"use client"
import "./globals.css";
import { Header } from "../components/Header/Header";
import { Preloader } from "../components/Preloader/Preloader";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  })

  return (
    <html lang="en">
      <body>
        {/* <Preloader /> */}
        {show && (
          <>
            <Header />
            {children}
          </>
        )}
      </body>
    </html>
  );
}
