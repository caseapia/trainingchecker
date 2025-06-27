import Cookies from "js-cookie";

export default function getBrowserLanguage() {
  const currentLanguage = typeof window !== "undefined" ? navigator.language.split("-")[0] : "en";
  const languageCookie = Cookies.get("user__Language");

  if (languageCookie) {
    return;
  } else {
    Cookies.set("user__Language", currentLanguage);
  }

  return languageCookie;
}