"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const useTitle = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    setNickname(searchParams.get("nickname"));
  }, [searchParams]);

  useEffect(() => {
    let title: string;
    const pathParts = pathname.split("/");
    const page = pathParts[1];

    switch (page) {
      case "not-found":
        title = "Страница не найдена";
        break;
      case "player":
        title = `Player ${nickname || "Unknown"}`;
        break;
      case "players":
        title = "Players";
        break;
      case "badges":
        title = "Badges";
        break;
      case "worldlist":
        title = "Worlds";
        break;
      case "copchase":
        title = "Copchase monitoring";
        break;
      default:
        title = "";
    }

    document.title = page ? `${title} - TRAINING CHECKER` : "TRAINING CHECKER";
  }, [pathname, nickname]);
};

export default useTitle;
