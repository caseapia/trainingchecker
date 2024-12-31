"use client";
import "./globals.css";
import { Header } from "@/modules/Header/Header";
import { Analytics } from "@vercel/analytics/react";
import { ToastProvider } from "@/components/Toast/context/ToastContext";
import ToastInitializer from "@/components/Toast/ToastInitializer";
import Toast from "@/components/Toast/Toast";
import { toast } from '@/utils/toast';
import React, {useEffect} from "react";
import Snow from "@/modules/Snow/Snow";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
	
	useEffect(() => {
		if (window.location.hostname.includes('dev')) {
			toast.basic('Эта версия сайта является нестабильной и предназначена для тестирования, возможны баги', {
				title: 'Внимание!',
			})
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
        <Snow />
        <ToastProvider>
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