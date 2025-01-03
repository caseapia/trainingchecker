"use client";
import "./globals.css";
import { Header } from "@/modules/Header/Header";
import { Analytics } from "@vercel/analytics/react";
import { ToastProvider } from "@/components/Toast/context/ToastContext";
import ToastInitializer from "@/components/Toast/ToastInitializer";
import Toast from "@/components/Toast/Toast";
import { toast } from '@/utils/toast';
import React, { useEffect, useState } from "react";
import Snow from "@/modules/Snow/Snow";
import DebugMenu from '@/modules/Debug/debugMenu';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
	const [isDev, setIsDev] = useState(false);

	useEffect(() => {
		if (window.location.hostname.includes('dev') || window.location.hostname.includes('localhost')) {
			toast.basic('Эта версия сайта является нестабильной и предназначена для тестирования, возможны баги',)
      setIsDev(true);
		}
	}, []);
	
  return (
    <html lang="en">
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
            <DebugMenu />
          )}
          {!isDev && (
            <Snow/>
          )}
          <Header />
          {children}
          <Toast />
          <ToastInitializer />
          <Analytics />
        </ToastProvider>
      </body>
    </html>
  );
}