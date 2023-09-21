import { useEffect, useState } from "react";

interface DeviceInterface {
  isDesk: boolean,
  isTab: boolean,
  isMob: boolean,
}

const useDeviceDetect = () => {
  const getDeviceState = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth > 1024) {
      return {
        isDesk: true,
        isTab: false,
        isMob: false,
      };
    } else if (screenWidth <= 1024 && screenWidth >= 768) {
      return {
        isDesk: false,
        isTab: true,
        isMob: false,
      };
    } else {
      return {
        isDesk: false,
        isTab: false,
        isMob: true,
      };
    }
  };

  const [device, setDevice] = useState<DeviceInterface>(getDeviceState);

  useEffect(() => setDevice(getDeviceState), [])

  // useEffect(() => {
  //   const handleResize = () => {
  //     const newDeviceState = getDeviceState();
  //     if (
  //       newDeviceState.isDesk !== device.isDesk ||
  //       newDeviceState.isTab !== device.isTab ||
  //       newDeviceState.isMob !== device.isMob
  //     ) {
  //       setDevice(newDeviceState);
  //     }
  //   };

  //   // Add event listener for window resize
  //   window.addEventListener('resize', handleResize);

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, [device]);

  return device;
};

export default useDeviceDetect;
