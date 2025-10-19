import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/modules/Header/Header";
import { ToastProvider } from "@/components/Toast/context/ToastContext";
import ToastInitializer from "@/components/Toast/ToastInitializer";
import Toast from "@/components/Toast/Toast";
import React, { ReactNode, Suspense } from "react";
import settings from "@/shared/constants/settings";
import Snow from "@/modules/Snow/Snow";
import DynamicTitle from "@/hooks/setTitle";
import { Inter } from "next/font/google"
import PageTracker from "@/utils/helpers/PageTracker";
import { I18nextClientProvider } from "@/i18n/I18nextProvider";

export const metadata: Metadata = {
  title: "TRAINING CHECKER",
  openGraph: {
    title: "TRAINING CHECKER",
    description: "This site is designed to help players of the SAMP server." +
      "TRAINING Sandbox using open API"
  },
  description: "This site is designed to help players of the SAMP server." + "TRAINING Sandbox using open API",
  keywords: "SAMP, TRAINING, CHECKER, API, SAMP SERVER, TRAINING SANDBOX",
}

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  preload: true,
})

export default function RootLayout({ children }: { children: ReactNode }) {
  const snow = settings.find(s => s.option === "SNOW")?.value || false;
  
  return (
    <html
      lang="ru"
      className={inter.className}
    >
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
    {snow && <Snow/>}
    <I18nextClientProvider>
      <ToastProvider>
        <Suspense fallback={null}>
          <DynamicTitle/>
          <PageTracker/>
        </Suspense>
        <Header/>
        {children}
        <Toast/>
        <ToastInitializer/>
      </ToastProvider>
    </I18nextClientProvider>
    </body>
    </html>
  );
}