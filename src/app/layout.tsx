"use client";
import "./globals.css";
import { Header } from "../components/Header/Header";
import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";
import { Elements } from '@/consts/headerElements';

export default function RootLayout({ children, }: { children: React.ReactNode; }) {

  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/assets/icons/favicon.png" type="image/x-icon" />
        <title>TRAINING CHECKER</title>
      </head>
      <body>
        <Header />
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
