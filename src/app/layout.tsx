"use client";
import "./globals.css";
import { Header } from "@/modules/Header/Header";
import { ToastProvider } from "@/components/Toast/context/ToastContext";
import ToastInitializer from "@/components/Toast/ToastInitializer";
import Toast from "@/components/Toast/Toast";
import React from "react";
import setTitle from "@/hooks/setTitle";
import settings from '@/consts/settings';
import Snow from "@/modules/Snow/Snow";

export default function RootLayout({children}: {children: React.ReactNode}) {
  const snow = settings.find(s => s.option === 'snow')?.value || false;
  const devTools = settings.find(s => s.option === 'devTools')?.value || false;
  // setTitle();
	
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
        {devTools}
        {snow && <Snow />}
        <ToastProvider>
          <Header/>
          {children}
          <Toast/>
          <ToastInitializer/>
        </ToastProvider>
        </body>
      </html>
  );
}