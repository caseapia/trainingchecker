"use client";
import "./globals.css";
import { Header } from "../components/Header/Header";
import Notify from "../components/Notify/Notify";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
      (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){
          (m[i].a=m[i].a||[]).push(arguments)
        };
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {
          if (document.scripts[j].src === r) { return; }
        }
        k=e.createElement(t),a=e.getElementsByTagName(t)[0];
        k.async=1;
        k.src=r;
        a.parentNode.insertBefore(k,a);
      })(window, document, "script", "https://mc.webvisor.org/metrika/tag_ww.js", "ym");
      ym(98876766, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true,
        trackHash:true
      });
    `;
    document.head.appendChild(script);
  }, []);

  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          href="/assets/icons/favicon.png"
          type="image/x-icon"
        />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
