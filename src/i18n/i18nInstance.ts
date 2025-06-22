import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

if (!i18n.isInitialized) {
  i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
      fallbackLng: "en",
      lng: typeof window !== "undefined" ? navigator.language.split("-")[0] : "en",
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
        "players"
      ],
      defaultNS: "common",
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
      react: {
        useSuspense: false,
      },
    });
}

export default i18n;
