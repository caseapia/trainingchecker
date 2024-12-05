"use client";
import "./globals.css";
import { Header } from "../components/Header/Header";
import { Analytics } from "@vercel/analytics/react";
import { ToastProvider } from "@/components/Toast/context/ToastContext";
import ToastInitializer from "@/components/Toast/ToastInitializer";
import Toast from "@/components/Toast/Toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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