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
            latitude: number | null
            longitude: number | null
            place_id: string | null
            main_text: string | null
            secondary_text: string | null
            cityName: string | null
            stateName: string | null
        }
    }
}

// UserContext Interface
interface UserContextInterface {
    userInfo: UserInfo;
    updateUserInfo: (newInfo: UserInfo) => void;
}

// Create the initial context
const initialUserInfo: UserInfo = (() => {
    const userInfoString = localStorage.getItem("userInfo");

    if (userInfoString !== null) {
        return JSON.parse(userInfoString);

    } else {
        return {
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
                    place_id: null,
                    main_text: null,
                    secondary_text: null,
                    cityName: null,
                    stateName: null
                }
            }
        }
    }
})();

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