"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { metric } from "@/utils/metric";

const PageTracker = () => {
  const pathname = usePathname();
  const hash = Cookies.get("__ha_sh");
  const searchParams = useSearchParams();
  const nickname = searchParams.get("nickname");

  useEffect(() => {
    if (!hash) {
      return;
    }

    metric.send("User has successfully load page", "Success", {
      additionalData: {
        pathname,
        ...(nickname && { nickname }),
      },
      hash: hash,
    });
  }, [pathname, hash]);

  return null;
}

export default PageTracker;