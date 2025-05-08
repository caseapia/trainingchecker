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
  openGraph: {
    title: "TRAINING CHECKER",
    description: "This site is designed to help players of the SAMP server." +
      "TRAINING Sandbox using open API"
  },
  description: "This site is designed to help players of the SAMP server." + "TRAINING Sandbox using open API",
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
      <meta name="google-site-verification"
        content="ye4U3g0JgocxViEhe5dO9xTYoYZ8qs6iynjUgOcDXhY"/>
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