import { createContext, useState } from 'react';

// Shape of userInfo object
type UserInfo = {
    isLoggedIn: boolean
    cart: {
        cartItemsCount: number
        cartItems: string[] | null
    },
    location: {
        isInstamartEnabled: boolean
        cityInfo: {
            latitude: string | null
            longitude: string | null
            place_id: string | null
            main_text: string | null
            secondary_text: string | null
        }
    }
}

// UserContext Interface
interface UserContextInterface {
    userInfo: UserInfo;
    updateUserInfo: (newInfo: UserInfo) => void;
}

// Create the initial context
const initialUserInfo: UserInfo = {
    isLoggedIn: false,
    cart: {
        cartItemsCount: 0,
        cartItems: null
    },
    location: {
        isInstamartEnabled: true,
        cityInfo: {
            latitude: null,
            longitude: null,
            place_id: "NFv9DDkRQJY4FbcFcgM",
            main_text: "Delhi",
            secondary_text: "Cannought Place, CP New Delhi, India"
        }
    }
};

const UserContext = createContext<UserContextInterface>({
    userInfo: initialUserInfo,
    updateUserInfo: () => { }
});

UserContext.displayName = "UserContext";

export const UserContextProvider = (props: React.PropsWithChildren<object>) => {
    const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);

    const updateUserInfo = (newInfo: UserInfo) => {
        console.warn('Updated user info:', newInfo);

        // Update user DB
        localStorage.setItem("userInfo", JSON.stringify(newInfo));

        // Update userInfoState
        setUserInfo(newInfo);
    };

    const contextValue: UserContextInterface = {
        userInfo,
        updateUserInfo,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContext