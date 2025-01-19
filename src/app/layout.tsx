"use client";
import "./globals.css";
import { Header } from "@/modules/Header/Header";
import { ToastProvider } from "@/components/Toast/context/ToastContext";
import ToastInitializer from "@/components/Toast/ToastInitializer";
import Toast from "@/components/Toast/Toast";
import React, { useEffect, useState } from "react";
import DebugMenu from '@/modules/Debug/debugMenu';
import setTitle from "@/hooks/setTitle";

export default function RootLayout({children}: {children: React.ReactNode}) {
	const [isDev, setIsDev] = useState<boolean>(false);
  // setTitle();

	useEffect(() => {
		if (window.location.hostname.includes('dev') || window.location.hostname.includes('localhost')) {
      setIsDev(true);
		}
	}, []);
	
  return (
    <html lang="ru">
      <head>
        <link
          rel="shortcut icon"
          href="/assets/icons/favicon.png"
          type="image/x-icon"
        />
        <title>TRAINING CHECKER</title>
      </head>
        <body>
        <ToastProvider>
          {isDev && (
            <DebugMenu/>
          )}
          <Header/>
          {children}
          <Toast/>
          <ToastInitializer/>
        </ToastProvider>
        </body>
      </html>
  );
}