import { useEffect, useState } from "react";

const useDeviceDetection = () => {
  const [device, setDevice] = useState<string>();

  useEffect(() => {

    function logScreenType() {
      const screenWidth = window.innerWidth;

      if (screenWidth > 1100) {
        setDevice('desk');
      } else if (screenWidth <= 1100 && screenWidth >= 765) {
        setDevice('tab');
      } else {
        setDevice('mob');
      }
    }

    setInterval(() => console.log("Interval"), 1000)

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

export default useDeviceDetection
