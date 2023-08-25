import { useEffect, useState } from "react";

const useDeviceDetect = () => {
  const [device, setDevice] = useState<string>();

  useEffect(() => {

    function logScreenType() {
      const screenWidth = window.innerWidth;

      if (screenWidth > 1024) {
        setDevice('desk');
      } else if (screenWidth <= 1024 && screenWidth >= 765) {
        setDevice('tab');
      } else {
        setDevice('mob');
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
