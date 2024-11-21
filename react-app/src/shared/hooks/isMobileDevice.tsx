import { useEffect, useState } from "react"

export const isMobileDevice = (): boolean => {
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    const isMobile = /android|iphone|ipad|ipod|windows phone/i.test(userAgent);
    setIsMobileDevice(isMobile);
  }, [])

  return isMobileDevice;
}