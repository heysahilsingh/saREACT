import { useEffect, useState } from "react";

const useUserLocation = () => {
    const [userLocation, setUserLocation] = useState(Object);

    useEffect(() => {
        const location = localStorage.getItem("USER_LOCATION") || {place_id: "123456"};
        setUserLocation(location)
    }, []);

    return [userLocation, setUserLocation];
}

export default useUserLocation;
