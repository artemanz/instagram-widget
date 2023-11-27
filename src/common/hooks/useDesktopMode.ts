import { useEffect } from "react";

import { isMobile } from "react-device-detect";

export const useDesktopMode = () => {
  const detectDesktopMode =
    !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
      navigator.userAgent
    );
  useEffect(() => {
    if (isMobile && detectDesktopMode) {
      const metaTag = document.head.querySelector("meta[name=viewport]");
      // @ts-ignore
      metaTag.content = "width=1920";
    }
  }, []);
};
