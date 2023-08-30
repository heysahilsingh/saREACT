import { ChangeEvent, useContext, useState } from 'react';
import SearchError from './SearchError';
import CONSTANTS from '../../../constants';
import SearchAutoComplete from './SearchAutocomplete';
import { IconCurrentLocation, IconSearch } from '@tabler/icons-react';
import useDeviceDetect from '../../../hooks/useDeviceDetect';
import UserContext from '../../../context/UserContext';

interface LocationSearchProps {
    screen: "desk" | "mob",
    callback?: () => void
}


interface LocationSuggesionInterface {
    structured_formatting: {
        main_text: string;
        secondary_text: string
    },
    place_id: string,
}

const LocationSearch = (props: LocationSearchProps) => {

    const { userInfo, updateUserInfo } = useContext(UserContext);

    const device = useDeviceDetect();

    const API_LOCATION_SUGGESTION = device?.isDesk ? CONSTANTS.API_LOCATION_SUGGESTION.desk : CONSTANTS.API_LOCATION_SUGGESTION.mob;
    const API_USER_LOCATION = device?.isDesk ? CONSTANTS.API_USER_LOCATION.by_place_id.desk : CONSTANTS.API_USER_LOCATION.by_place_id.mob;

    // Error Message
    const [showError, setShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Location options
    const [locationSuggestion, setLocationSuggestion] = useState<LocationSuggesionInterface[]>([]);

    // Function to asking location
    const askLocation = async () => {
        navigator.geolocation.getCurrentPosition((e) => console.log("Success " + e), () => console.log("please allow"))
    }

    // Function to print location suggestions
    const showLocationSuggestion = async (element: ChangeEvent<HTMLInputElement>) => {
        try {
            const keyword = element.target.value;

            // If input is empty
            if (keyword.trim() === '') {
                setLocationSuggestion([]);
                if (showError) setShowError(false)
            }
            // If input is having a value
            else {
                const response = await fetch(API_LOCATION_SUGGESTION + keyword);

                const data = await response.json();

                if (data?.data?.length > 0) {
                    if (showError) setShowError(false)
                    setLocationSuggestion(data?.data)
                } else {
                    setShowError(true)
                    setLocationSuggestion([])
                    setErrorMessage("No results, please enter a valid street address")
                }
            }

        } catch (error) {
            setShowError(true);
            setErrorMessage("An error occured.");
        }
    }

    // Function to update user location
    const updateUserLocation = async (value: LocationSuggesionInterface) => {
        try {
            const response = await fetch(API_USER_LOCATION + value.place_id);
            const data = await response.json();

            // Update UserInfo Context
            updateUserInfo({
                ...userInfo,
                location: {
                    cityInfo: {
                        latitude: data?.data[0]?.geometry?.location?.lat,
                        longitude: data?.data[0]?.geometry?.location?.lng,
                        place_id: value.place_id,
                        main_text: value.structured_formatting.main_text,
                        secondary_text: value.structured_formatting.secondary_text
                    },
                    isInstamartEnabled: userInfo.location.isInstamartEnabled
                }
            })

            // Run callback if provided for this component
            if (props.callback) props.callback()

        } catch (error) {
            setShowError(true);
            setErrorMessage("Error while setting location, please retry or reload the page.");
        }
    }


    if (props.screen === "desk") {
        return (
            <>
                <div className="location-search">
                    <div className='flex w-full'>
                        <div className="grow flex gap-2 items-center border-2 font-medium border-zinc-300 py-4 px-5 leading focus-within:border-primary dark:border-zinc-800 dark:focus-within:border-primary">
                            <input className="bg-transparent outline-0 grow text-zinc-950 dark:text-zinc-300 focus:outline-0 active:outline-0" type="search" placeholder="Enter your delivery location" />
                            <button className="group flex gap-2 items-center w-fit text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-300">
                                <IconCurrentLocation className='group-hover:text-zinc-950 dark:group-hover:text-zinc-300 text-zinc-500' size={20} stroke={1.5} />
                                Locate Me
                            </button>
                        </div>
                        <button className="font-bold text-white bg-primary py-4 px-5">FIND FOOD</button>
                    </div>
                    {/* {showError && <SearchError text={errorMessage} />} */}
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="location-search">
                    <div className="wrapper">
                        {/* Search Input */}
                        <div className="grow flex gap-2 items-center border-2 font-medium border-zinc-300 py-3 px-4 leading focus-within:border-primary dark:border-zinc-800 dark:focus-within:border-primary">
                            <input onChange={showLocationSuggestion} className='bg-transparent outline-none grow text-zinc-950 dark:text-zinc-300' type="search" placeholder='Enter area, street name...' />
                            <IconSearch className="text-zinc-400 dark:text-zinc-600" size={20} stroke={2} />
                        </div>

                        {/* Divider */}
                        <hr className='border-4 border-zinc-300 dark:border-zinc-800' />

                        {/* Location Suggestions */}
                        <div className="p-3 flex flex-col gap-4">
                            {/* Error Message */}
                            {showError && <SearchError text={errorMessage} />}

                            {/* Suggestions */}
                            {locationSuggestion.length > 0 && (
                                <div className="location-options">
                                    {locationSuggestion.map(option => {
                                        return <SearchAutoComplete onClick={() => updateUserLocation(option)} key={option?.place_id} heading={option?.structured_formatting?.main_text} subHeading={option?.structured_formatting?.secondary_text} />
                                    })}
                                </div>
                            )}

                            {/* Detect Location */}
                            {locationSuggestion.length < 1 && (
                                <button onClick={askLocation} className="group flex gap-4 items-center w-fit text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-300">
                                    <IconCurrentLocation className="group-hover:text-zinc-950 dark:group-hover:text-zinc-300 text-zinc-500" size={30} stroke={1.5} />
                                    <p className='flex flex-col items-start'>
                                        <span className='font-bold'>Use Current Location</span>
                                        <span className='text-xs'>Using GPS</span>
                                    </p>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default LocationSearch