"use client"
import "./globals.css";
import { Header } from "../components/Header/Header";
import { Preloader } from "../components/Preloader/Preloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <Header />
        {children}
      </body>
    </html>
  );
}