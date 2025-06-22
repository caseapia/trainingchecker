import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { isDevModeEnabled } from "@/utils/metric";

if (!i18n.isInitialized) {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: "en",
      supportedLngs: ["en", "ru"],
      ns: ["common", "nav", "playerinfo", "errors"],
      defaultNS: "common",
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
      detection: {
        order: ["navigator", "htmlTag", "path", "subdomain"],
        caches: [],
      },
      react: {
        useSuspense: true,
      },
      debug: isDevModeEnabled,
    });
}

export default i18n;
