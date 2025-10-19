"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { metric } from "@/utils/metric";
import getBrowserLanguage from "@/utils/helpers/getBrowserLanguage";

const PageTracker = () => {
  const pathname = usePathname();
  const hash = Cookies.get("__ha_sh");
  const searchParams = useSearchParams();
  const nickname = searchParams.get("nickname");
  const browserLanguage = getBrowserLanguage();

  useEffect(() => {
    if (!hash) {
      return;
    }

    metric.send("User has successfully load page", "Success", {
      additionalData: {
        pathname,
        browserLanguage,
        ...(nickname && { nickname }),
      },
      hash: hash,
    });
  }, [pathname, hash]);

  useEffect(() => {
    getBrowserLanguage();
  }, []);

  return null;
}

export default PageTracker;