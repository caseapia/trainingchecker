import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import Cookies from "js-cookie";

if (!i18n.isInitialized) {
  const currentLanguage = Cookies.get("user__Language");

  i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
      fallbackLng: "en",
      lng: currentLanguage,
      supportedLngs: ["en", "ru"],
      ns: [
        "common",
        "nav",
        "playerinfo",
        "errors",
        "additionalinfo",
        "punishment",
        "admins",
        "badges",
        "badge",
        "copchase",
        "players",
        "suffixes",
        "title"
      ],
      defaultNS: "common",
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
      react: {
        useSuspense: false,
      },
      debug: process.env.NODE_ENV === "development",
    });
}

export default i18n;
