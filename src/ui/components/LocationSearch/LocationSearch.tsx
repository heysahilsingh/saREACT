import { ChangeEvent, useContext, useState } from 'react';
import SearchError from './SearchError';
import CONSTANTS from '../../../constants';
import SearchAutoComplete from './SearchAutocomplete';
import { IconCurrentLocation, IconSearch } from '@tabler/icons-react';
import useDeviceDetect from '../../../hooks/useDeviceDetect';
import UserContext from '../../../context/UserContext';
import waitAMoment from '../../../utility/waitAMoment';

interface LocationSearchProps {
    screen: "desk" | "mob",
    onSelect: () => void
}

interface LocationSuggesionInterface {
    structured_formatting: {
        main_text: string;
        secondary_text: string
    },
    place_id: string,
}

interface GeoLocationInterface {
    latitude: number,
    longitude: number
}

const LocationSearch = (props: LocationSearchProps) => {

    const { userInfo, updateUserInfo } = useContext(UserContext);

    const device = useDeviceDetect();

    const API_LOCATION_SUGGESTION = device?.isDesk ? CONSTANTS.API_LOCATION_SUGGESTION.url.desk : CONSTANTS.API_LOCATION_SUGGESTION.url.mob;
    const API_USER_LOCATION_BY_PLACE_ID = device?.isDesk ? CONSTANTS.API_USER_LOCATION.url.by_place_id.desk : CONSTANTS.API_USER_LOCATION.url.by_place_id.mob;
    const API_USER_LOCATION_BY_GEO_ID = device?.isDesk ? CONSTANTS.API_USER_LOCATION.url.by_geo_id.desk : CONSTANTS.API_USER_LOCATION.url.by_geo_id.mob;

    // Error Message
    const [showError, setShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Location options
    const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggesionInterface[]>([]);

    // Function to ask location permission
    const askLocation = async () => {
        navigator.geolocation.getCurrentPosition(
            (location) => {
                if (setShowError) setShowError(false);

                updateUserLocation("geo_id", {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                })

            },

            () => {
                setShowError(true)
                setErrorMessage("Location services is disabled.");
            }
        )
    }

    // Function to print location suggestions
    const showLocationSuggestion = async (element: ChangeEvent<HTMLInputElement>) => {
        try {
            const keyword = element.target.value;

            // If input is empty
            if (keyword.trim() === '') {
                setLocationSuggestions([]);
                if (showError) setShowError(false)
            }
            // If input is having a value
            else {
                const response = await fetch(API_LOCATION_SUGGESTION + keyword);

                const data = await response.json();

                if (data?.data?.length > 0) {
                    if (showError) setShowError(false)
                    setLocationSuggestions(data?.data)
                } else {
                    setShowError(true)
                    setLocationSuggestions([])
                    setErrorMessage("No results, please enter a valid street address")
                }
            }

        } catch (error) {
            setShowError(true);
            setErrorMessage("An error occured.");
        }
    }

    // Function to update user location
    const updateUserLocation = async (arg1: "geo_id" | "place_id", arg2: LocationSuggesionInterface | GeoLocationInterface) => {
        try {
            let data;

            // If 
            if (arg1 === "geo_id") {
                const geoValue = arg2 as { latitude: number; longitude: number };

                const response = await fetch(API_USER_LOCATION_BY_GEO_ID + "latlng=" + geoValue?.latitude + "%2C" + geoValue?.longitude);

                data = await response.json();
            }
            //Else
            else if (arg1 === "place_id") {
                const placeValue = arg2 as LocationSuggesionInterface;

                const response = await fetch(API_USER_LOCATION_BY_PLACE_ID + placeValue?.place_id);
                data = await response.json();
            }

            // Main text
            const main_Text = data?.data[0]?.address_components?.find((comp: { types: string[] }) =>
                comp?.types?.includes("locality")
            );

            // City Name
            const city_Name = data?.data[0]?.address_components?.find((comp: { types: string[] }) =>
                comp?.types?.includes("city")
            );

            // State Name
            const state_Name = data?.data[0]?.address_components?.find((comp: { types: string[] }) =>
                comp?.types?.includes("state")
            );

            // Update UserInfo Context
            await updateUserInfo({
                ...userInfo,
                location: {
                    cityInfo: {
                        latitude: data?.data[0]?.geometry?.location?.lat,
                        longitude: data?.data[0]?.geometry?.location?.lng,
                        place_id: data?.data[0]?.place_id,
                        main_text: main_Text ? main_Text.long_name : data?.data[0]?.place_type,
                        secondary_text: data?.data[0]?.formatted_address,
                        cityName: city_Name ? city_Name.long_name : null,
                        stateName: state_Name ? state_Name.long_name : null
                    },
                    isInstamartEnabled: userInfo.location.isInstamartEnabled
                }
            })

            // Run onSelect if provided for this component
            if (props?.onSelect) props?.onSelect()

            // Clean up
            setShowError(false)
            setLocationSuggestions([])

        } catch (error) {
            setShowError(true);
            setErrorMessage("Error while saving location, please retry or reload the page.");
        }
    }

    return (
        <div className="location-search">
            <div className="wrapper">
                {/* Search Input For Desk*/}
                {props.screen === "desk" && (
                    <div className='flex w-full'>
                        <div className="grow flex gap-2 items-center border-2 font-medium border-zinc-300 py-4 px-5 leading focus-within:border-primary dark:border-zinc-800 dark:focus-within:border-primary">
                            <input onChange={waitAMoment(showLocationSuggestion, 300)} className="bg-transparent outline-0 grow text-zinc-950 dark:text-zinc-300 focus:outline-0 active:outline-0" type="search" placeholder="Enter your delivery location" />
                            <button onClick={askLocation} className="group flex gap-2 items-center w-fit text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-300">
                                <IconCurrentLocation className='group-hover:text-zinc-950 dark:group-hover:text-zinc-300 text-zinc-500' size={20} stroke={1.5} />
                                Locate Me
                            </button>
                        </div>
                        <button className="font-bold text-white bg-primary py-4 px-5">FIND FOOD</button>
                    </div>
                )}
                {/* Search Input For Mob*/}
                {props.screen === "mob" && (
                    <div className="grow flex gap-2 items-center border-2 font-medium border-zinc-300 py-3 px-4 leading focus-within:border-primary dark:border-zinc-800 dark:focus-within:border-primary">
                        <input onChange={waitAMoment(showLocationSuggestion, 300)} className='bg-transparent outline-none grow text-zinc-950 dark:text-zinc-300' type="search" placeholder='Enter area, street name...' />
                        <IconSearch className="text-zinc-400 dark:text-zinc-600" size={20} stroke={2} />
                    </div>
                )}

                {/* Divider */}
                <hr className='border-4 mt-6 mb-4 lg:border-0 lg:mt-2 border-zinc-100 dark:border-zinc-800' />

                {/* Location Suggestions */}
                <div className="flex flex-col gap-4">
                    {/* Error Message */}
                    {showError && <SearchError text={errorMessage} />}

                    {/* Suggestions */}
                    {locationSuggestions.length > 0 && (
                        <div className="location-options">
                            {locationSuggestions.map(option => {
                                return <SearchAutoComplete onClick={() => updateUserLocation("place_id", option)} key={option.place_id} heading={option.structured_formatting?.main_text} subHeading={option.structured_formatting?.secondary_text} />
                            })}
                        </div>
                    )}

                    {/* Detect Location */}
                    {locationSuggestions.length < 1 && props.screen === "mob" && (
                        <button onClick={askLocation} className="group w-full flex gap-4 items-center min-w-fit text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-300">
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
    )
}

export default LocationSearch