import { useEffect, useState } from "react";

export const useMetric = (message: string) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const TGBotToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const TGBotChatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

    if (!TGBotToken || !TGBotChatId) {
      setError("Ошибка: отсутствует токен Telegram или ID чата.");
      console.error("Telegram tokens are missing");
      return;
    }

    const sendMetric = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) {
          return;
        }
        const data = await res.json();
        const userAgent = navigator.userAgent;
        const language = navigator.language;

        const fullMessage = `${message}\n` +
          `**IP:** ${data.ip}\n` +
          `**City:** ${data.city}\n` +
          `**Region:** ${data.region}\n` +
          `**Country:** ${data.country_name}\n` +
          `**Language:** ${language}\n` +
          `**User-Agent:** ${userAgent}`;

        const telegramRes = await fetch(`https://api.telegram.org/bot${TGBotToken}/sendMessage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: TGBotChatId,
            text: fullMessage,
          }),
        });

        if (!telegramRes.ok) {
          return;
        }
      } catch (err: any) {
        return;
      }
    };

    sendMetric();
  }, [message]);

  return { error };
};