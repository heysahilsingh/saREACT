import { useEffect, useState } from "react";

const useUserLoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>();

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn");
        if (loggedIn === "true") {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return isLoggedIn;
}

export default useUserLoggedIn;
