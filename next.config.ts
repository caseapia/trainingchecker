import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Найти правило обработки файлов, которое отвечает за загрузку SVG
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg")
    );

    if (fileLoaderRule) {
      // Добавить обработку SVG с использованием SVGR
      config.module.rules.push(
        {
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
          use: fileLoaderRule.use, // Используем стандартный загрузчик для *.svg?url
        },
        {
          test: /\.svg$/i,
          resourceQuery: { not: [/url/] }, // Исключаем *.svg?url
          use: ["@svgr/webpack"], // Преобразуем SVG в React-компоненты
        }
      );

      // Исключить обработку SVG из стандартного загрузчика
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },
};

export default nextConfig;
