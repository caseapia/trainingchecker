import { useEffect, useState } from "react";

export const useIsMobileDevice = () => {
  const [isMobile, setMobile] = useState<boolean>(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth <= 1000);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}