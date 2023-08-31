import { useEffect, useState } from "react";

const useDeviceDetect = () => {
  const [device, setDevice] = useState({});

  useEffect(() => {

    function logScreenType() {
      const screenWidth = window.innerWidth;

      if (screenWidth > 1024) {
        setDevice({
          isDesk: true,
          isTab: false,
          isMob: false
        });
      } else if (screenWidth <= 1024 && screenWidth >= 765) {
        setDevice({
          isDesk: false,
          isTab: true,
          isMob: false
        });
      } else {
        setDevice({
          isDesk: false,
          isTab: false,
          isMob: true
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
