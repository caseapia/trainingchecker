"use client";
import "./globals.css";
import { Header } from "@/modules/Header/Header";
import { Analytics } from "@vercel/analytics/react";
import { ToastProvider } from "@/components/Toast/context/ToastContext";
import ToastInitializer from "@/components/Toast/ToastInitializer";
import Toast from "@/components/Toast/Toast";
import { toast } from '@/utils/toast';
import React, { useEffect, useState } from "react";
import DebugMenu from '@/modules/Debug/debugMenu';
import Cookies from "js-cookie";
import { Modal } from "@/components/Modal/Modal";
import CheckIcon from "@/icons/checkCircle.svg";
import XIcon from '@/icons/components/modal/xmark.svg';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
	const [isDev, setIsDev] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  const [isCookieModal, setIsCookieModal] = useState<boolean>(false)
  const [isMetricsModal, setIsMetricsModal] = useState<boolean>(false)

	useEffect(() => {
		if (window.location.hostname.includes('dev') || window.location.hostname.includes('localhost')) {
			toast.basic('Эта версия сайта является нестабильной и предназначена для тестирования, возможны баги',)
      setIsDev(true);
		}
	}, []);

  useEffect(() => {
    const TGBotToken = process.env["NEXT_PUBLIC_TELEGRAM_BOT_TOKEN"];
    const TGBotChatId = process.env["NEXT_PUBLIC_TELEGRAM_CHAT_ID"];
    const userAgent = navigator.userAgent;
    const language = navigator.language;

    fetch('https://ipapi.co/json/')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch IP address');
        }
        return res.json();
      })
      .then(data => {
        return fetch(`https://api.telegram.org/bot${TGBotToken}/sendMessage`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: `${TGBotChatId}`,
            text: `
            New user initialized\nIP: ${data.ip}\nNetwork: ${data.network}\nCountry: ${data.country_name}\n\nUser-Agent: ${userAgent}\nLanguage: ${language}
            `
          })
        });
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to send message to Telegram');
        }
        return res.json();
      })
      .catch(err => {
        console.error('Error:', err.message);
      });
  }, []);

  useEffect(() => {

    const getMetricsAccess = Cookies.get('cookie-metrics');
    const openModal = () => {
      setIsMetricsModal(true);
      setModalOpen(true);
    }
    if (getMetricsAccess !== '1') {
      toast.basic('Мы собираем обезличенную метрику о вас. Нажмите, чтобы узнать подробнее.', {
        clickAction: openModal,
      })
    }
  }, []);
  useEffect(() => {

    const getCookieAccess = Cookies.get('cookie-access');
    const openModal = () => {
      setIsCookieModal(true);
      setModalOpen(true);
    }
    if (getCookieAccess !== '1') {
      toast.basic('Мы храним обезличенные куки-файлы локально на вашем устройстве. Нажмите, чтобы узнать подробнее', {
        clickAction: openModal,
      })
    }
  }, []);

  const setCookieAccess = (value: number) => {

    Cookies.set('cookie-access', '1');
    setModalOpen(false);
    setIsCookieModal(false);

    toast[value === 0 ? "error" : "success"](
      value === 0
        ? "Вы отозвали разрешения на хранение Cookie"
        : "Вы предоставили сайту разрешение на хранение Cookie",
      { lifeTime: 5000 }
    );
  };
  const setMetricsAccess = (value: number) => {

    Cookies.set('cookie-metrics', `1`);
    setModalOpen(false);
    setIsMetricsModal(false);

    toast[value === 0 ? "error" : "success"](
      value === 0
        ? "Вы отозвали разрешения на сбор метрик"
        : "Вы предоставили сайту разрешение на сбор метрик",
      { lifeTime: 5000 }
    );
  };
	
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
        <ToastProvider>
          {isDev && (
            <DebugMenu />
          )}
          <Header />
          {children}
          <Toast />
          <ToastInitializer />
          <Analytics />
          {isModalOpen && (
            <Modal
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
              title={isCookieModal ? 'Согласие на использование Cookie' : isMetricsModal ? 'Согласие на сбор метрик' : undefined}
              firstButtonContent="Согласиться"
              firstButtonIcon={CheckIcon}
              firstButtonAction={isCookieModal ? () => setCookieAccess(1) : isMetricsModal ? () => setMetricsAccess(1) : undefined}
              secondButtonContent="Отказаться"
              secondButtonIcon={XIcon}
              secondButtonAction={isCookieModal ? () => setCookieAccess(0) : isMetricsModal ? () => setMetricsAccess(0) : undefined}
            >
              {isCookieModal && (
                <>
                  <h3 style={{ fontWeight: 500, textAlign: 'center' }}>Зачем мы используем cookie-файлы?</h3>
                  <p>Cookie-файлы необходимы для улучшения пользовательского опыта на нашем сайте. Мы используем их для хранения ваших предпочтений, а также для анализа поведения на сайте. Это помогает нам предоставлять более персонализированный контент и улучшать функциональность сайта. Cookie также используются для обеспечения безопасности и правильной работы некоторых функций, таких как сохранение ваших настроек.</p>
                </>
              )}
              {isMetricsModal && (
                <>
                  <h3 style={{fontWeight: 500, textAlign: 'center'}}>Зачем мы собираем обезличенную метрику?</h3>
                  <p>Мы собираем обезличенные метрики для анализа использования нашего сайта и улучшения его работы. Эти данные помогают нам понять, как пользователи взаимодействуют с различными разделами сайта, какие функции наиболее востребованы, а также выявить возможные проблемы в производительности. Обезличенные  данные не содержат личной информации, и их использование позволяет нам улучшать пользовательский опыт без нарушения конфиденциальности.</p>
                </>
              )}
            </Modal>
          )}
        </ToastProvider>
      </body>
    </html>
  );
}