import { createContext, useState } from 'react';
import useDeviceDetect from '../hooks/useDeviceDetect';
import CONSTANTS from '../constants';

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
    const device = useDeviceDetect();

    const knowInstaEnable = async (userLat: number, userLng: number) => {
        const URL = CONSTANTS.API_USER_LOCATION_INSTAMART.getUrl(userLat, userLng, device.isDesk ? "desk" : "mob");

        const response = await fetch(URL);
        const data = await response.json();

        const instaEnabledStatus = data?.data?.INSTAMART?.enabled;

        return instaEnabledStatus;
    }

    const updateUserInfo = async (newInfo: UserInfo) => {
        const userLat = newInfo.location.cityInfo.latitude;
        const userLng = newInfo.location.cityInfo.longitude;

        if (userLat && userLng) {
            const doesInstaMartEnabled = await knowInstaEnable(userLat, userLng);

            const newUserInfo: UserInfo = {
                ...newInfo,
                location: {
                    ...newInfo.location,
                    isInstamartEnabled: doesInstaMartEnabled
                }
            };

            console.warn('Updated user info:', newUserInfo);

            // Update user DB
            localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
    
            // Update userInfoState
            setUserInfo(newUserInfo);
        }
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