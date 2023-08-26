import { useEffect, useState } from "react";

interface Device {
  desk: boolean,
  tab: boolean,
  mob: boolean,
}

const useDeviceDetect = () => {
  const [device, setDevice] = useState<Device>();

  useEffect(() => {

    function logScreenType() {
      const screenWidth = window.innerWidth;

      if (screenWidth > 1024) {
        setDevice({
          desk: true,
          tab: false,
          mob: false
        });
      } else if (screenWidth <= 1024 && screenWidth >= 765) {
        setDevice({
          desk: false,
          tab: true,
          mob: false
        });
      } else {
        setDevice({
          desk: false,
          tab: false,
          mob: true
        });
      }
    }

    // Initial data based on screen width
    logScreenType();

    // Add event listener for window resize
    window.addEventListener('resize', logScreenType);

    // Cleanup: remove the event listener on component unmount
    return () => {
      window.removeEventListener('resize', logScreenType);
    };

  }, [])

  return device
}

export default useDeviceDetect
