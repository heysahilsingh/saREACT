import { useEffect, useState } from "react";

const useOnline = () => {
    const [isOnline, setOnline] = useState<string | undefined>("Online");

    useEffect(() => {
        window.addEventListener("online", () => {
            setOnline("Online");
            console.log("Your are online");
        });

        window.addEventListener("offline", () => {
            setOnline("Offline");
            console.log("Your are offline");
        })

    }, [])

    return isOnline
}

export default useOnline