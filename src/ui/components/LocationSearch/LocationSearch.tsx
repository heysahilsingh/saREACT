import { ChangeEvent, useState } from 'react';
import SearchError from './SearchError';
import CONSTANTS from '../../../constants';
// import SearchAutoComplete from './SearchAutocomplete';
import { IconCurrentLocation, IconSearch } from '@tabler/icons-react';
import useDeviceDetect from '../../../hooks/useDeviceDetect';
// import { useState } from 'react';

interface LocationSearchProps {
    screen: "desk" | "mob"
}


// interface LocationSuggesion {
//     structured_formatting: {
//         main_text: string;
//         secondary_text: string
//     },
//     place_id: string
// }

const LocationSearch = (props: LocationSearchProps) => {

    const device = useDeviceDetect();

    const API_Url = device?.isDesk ? CONSTANTS.API_LOCATION_SUGGESTION.desk : CONSTANTS.API_LOCATION_SUGGESTION.mob;

    // Error Message
    const [showError, setShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Location options
    // const [locationOptions, setLocationOptions] = useState();

    const showLocationOptions = async (element: ChangeEvent<HTMLInputElement>) => {
        try {
            const keyword = element.target.value;

            // If input is empty
            if (keyword.trim() === '') {
                // setLocationOptions([]);
            }
            // If input is having a value
            else {
                // const response = await fetch(API_Url + keyword);

                const response = await fetch("https://www.swiggy.com/mapi/misc/place-autocomplete?input=delhi&types=")

                const data = await response.json();

                console.log(data);
                // setLocationOptions(data.data)
            }

        } catch (error) {
            setShowError(true);
            setErrorMessage(String(error));
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
                            <input onChange={showLocationOptions} className='bg-transparent outline-none grow text-zinc-950 dark:text-zinc-300' type="search" placeholder='Enter area, street name...' />
                            <IconSearch className="text-zinc-400 dark:text-zinc-600" size={20} stroke={2} />
                        </div>

                        {/* Divider */}
                        <hr className='border-4 border-zinc-300 dark:border-zinc-800' />

                        {/* Location Suggestions */}
                        <div className="py-3 px-4 flex flex-col gap-4">
                            {/* Detect Location */}
                            {true && <button className="group flex gap-4 items-center w-fit text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-300">
                                <IconCurrentLocation className="group-hover:text-zinc-950 dark:group-hover:text-zinc-300 text-zinc-500" size={30} stroke={1.5} />
                                <p className='flex flex-col items-start'>
                                    <span className='font-bold'>Use Current Location</span>
                                    <span className='text-xs'>Using GPS</span>
                                </p>
                            </button>}

                            {/* Suggestions */}
                            {/* {locationOptions.length > 0 && locationOptions.map(option => {
                                return <SearchAutoComplete onClick={() => saveUserLocation(option.place_id)} key={option.place_id} heading={option.structured_formatting.main_text} subHeading={option.structured_formatting.secondary_text} />
                            })} */}

                            {/* Error Message */}
                            {showError && <SearchError text={errorMessage} />}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default LocationSearch