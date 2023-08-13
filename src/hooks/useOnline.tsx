import { useEffect, useState } from "react";

const useOnline = () => {
    const [isOnline, setOnline] = useState<string | undefined>();

    console.log("useOnline renders");

    useEffect(() => {
        window.addEventListener("online", () => {
            setOnline("Online");
            console.log("Your are online");
        });

    console.log("useEffect renders");

    //     window.addEventListener("offline", () => {
    //         setOnline("Offline")
    //     })

    setOnline("sa")
    }, [])

    return isOnline
}

export default useOnline