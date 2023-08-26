import { useEffect, useState } from "react";

interface Cart {
    count: number;
    items: Array<object>;
}

const useCart = () => {
    const [cart, setCart] = useState<Cart>({
        count: 0,
        items: [],
    });

    useEffect(() => {
        setCart({...cart, count: 5})
    }, []);

    return cart;
}

export default useCart;
