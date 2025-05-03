import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/modules/Header/Header";
import { ToastProvider } from "@/components/Toast/context/ToastContext";
import ToastInitializer from "@/components/Toast/ToastInitializer";
import Toast from "@/components/Toast/Toast";
import React, { ReactNode, Suspense } from "react";
import settings from "@/consts/settings";
import Snow from "@/modules/Snow/Snow";
import DynamicTitle from "@/hooks/setTitle";

export const metadata: Metadata = {
  title: "TRAINING CHECKER",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const snow = settings.find(s => s.option === "snow")?.value || false;
  const devTools = settings.find(s => s.option === "devTools")?.value || false;

  return (
    <html lang="ru">
    <head>
      <link
        rel="shortcut icon"
        href="/assets/icons/favicon.png"
        type="image/x-icon"
      />
      <meta name="theme-color"
        content="#000"/>
    </head>
    <body>
    {devTools}
    {snow && <Snow/>}
    <ToastProvider>
      <Suspense fallback={null}>
        <DynamicTitle/>
      </Suspense>
      <Header/>
      {children}
      <Toast/>
      <ToastInitializer/>
    </ToastProvider>
    </body>
    </html>
  );
}