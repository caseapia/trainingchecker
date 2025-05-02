"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import titles from "@/consts/titles";

const DynamicTitle = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const nickname = searchParams.get("nickname");

  useEffect(() => {
    const match = titles.find(t => t.page.includes(pathname));

    if (pathname === "/player") {
      document.title = `${nickname} - TRAINING CHECKER`
    } else if (pathname === "/") {
      document.title = "TRAINING CHECKER";
    }

    if (match && pathname !== "/") {
      document.title = `${match.title} - TRAINING CHECKER`;
    }
  }, [pathname]);

  return null;
};

export default DynamicTitle;
