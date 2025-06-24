"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import i18n from "i18next";

const DynamicTitle = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const nickname = searchParams.get("nickname");
  const t = i18n.getFixedT(null, "title")

  useEffect(() => {
    switch (pathname) {
      case "/player": {
        document.title = `${nickname} - TRAINING CHECKER`
        break;
      }
      case "/admins": {
        document.title = `${t("admins")} - TRAINING CHECKER`
        break;
      }
      case "/badges": {
        document.title = `${t("badges")} - TRAINING CHECKER`
        break;
      }
      case "/copchase": {
        document.title = `${t("copchase")} - TRAINING CHECKER`
        break;
      }
      case "/players": {
        document.title = `${t("players")} - TRAINING CHECKER`
        break;
      }
      case "/worldlist": {
        document.title = `${t("worldlist")} - TRAINING CHECKER`
        break;
      }
      default:
        document.title = "TRAINING CHECKER";
        break;
    }
  }, [pathname]);

  return null;
};

export default DynamicTitle;
