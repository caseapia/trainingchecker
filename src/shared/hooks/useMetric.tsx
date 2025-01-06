export const sendMetric = async ({ action, error, additionMessage }: { action: string, error?: string, additionMessage?: string }) => {
  const TGBotToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const TGBotChatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

  if (!TGBotToken || !TGBotChatId) return;

  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) return;
    const data = await res.json();

    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const time = new Date().toISOString();
    const page = window.location.href;

    // Формируем сообщение
    let fullMessage =
      `Действие: ${action}\n\n` +
      `IP: ${data.ip}\n` +
      `Город: ${data.city}\n` +
      `Регион: ${data.region}\n` +
      `Страна: ${data.country_name}\n` +
      `Язык (браузер): ${language}\n` +
      `User-Agent: ${userAgent}\n` +
      `Время: ${time}\n\n` +
      `Страница: ${page}\n`;

    if (error) {
      fullMessage += `\nОшибка: ${error}\n`;
    }
    if (additionMessage) {
      fullMessage += `\nДополнительная информация: ${additionMessage}\n`;
    }
    if (page.includes('test')) {
      fullMessage += `\n\nВНИМАНИЕ: произведен переход на страницу /test`
    }

    // Отправка в Telegram
    await fetch(`https://api.telegram.org/bot${TGBotToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TGBotChatId,
        text: fullMessage,
      }),
    });
  } catch (err) {
    console.error("Metric error:", err);
  }
};
