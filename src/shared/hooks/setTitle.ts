"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const DynamicTitle = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const nickname = searchParams.get("nickname");

  useEffect(() => {
    switch (pathname) {
      case "/player": {
        document.title = `${nickname} - TRAINING CHECKER`
        break;
      }
      case "/admins": {
        document.title = "Список администраторов - TRAINING CHECKER"
        break;
      }
      case "/badges": {
        document.title = "Список значков - TRAINING CHECKER"
        break;
      }
      case "/copchase": {
        document.title = "Мониторинг копчейза - TRAINING CHECKER"
        break;
      }
      case "/players": {
        document.title = "Список игроков - TRAINING CHECKER"
        break;
      }
      case "/worldlist": {
        document.title = "Список миров - TRAINING CHECKER"
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
