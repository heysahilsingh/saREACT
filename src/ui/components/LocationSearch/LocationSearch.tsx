import { useState, ChangeEvent } from 'react';
import SearchError from './SearchError';
import SearchAutoComplete from './SearchAutocomplete';
import CONSTANTS from '../../../constants';

interface LocationSearchProps {
    screen: "desk" | "mob"
}

const LocationSearch = (props: LocationSearchProps) => {

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Error");
    const [locationOptions, setLocationOptions] = useState([]);

    const searchSuggestion = async (element: ChangeEvent<HTMLInputElement>) => {
        try {
            const keyword = element.target.value;

            // If input is empty
            if (keyword.trim() === '') {
                setLocationOptions([]);
            }
            // If input is having a value
            else {
                const response = await fetch(CONSTANTS.DELIVERY_LOCATION_SUGGESTION + keyword);

                if (!response.ok) {
                    setShowError(true);
                    setErrorMessage("We are fixing a temporary glitch. Sorry for the inconvenience. Please try again.");
                }

                const data = await response.json();
                // console.log(data);

                setLocationOptions(data.data)

                console.log(
                    locationOptions.map(option => option.place_id)
                );

                // console.log(locationOptions.map(option => option.structured_formatting));
            }

        } catch (error) {
            setShowError(true);
            setErrorMessage("An error occured.");
        }
    }


    if (props.screen === "desk") {
        return (
            <>
                <div className="location-search">
                    <div className='flex w-full'>
                        <div className="grow flex gap-2 items-center border-2 font-medium border-zinc-300 py-4 px-5 leading focus-within:border-primary dark:border-zinc-800 dark:focus-within:border-primary">
                            <input className="bg-transparent outline-0 grow text-zinc-950 dark:text-zinc-300" type="search" placeholder="Enter your delivery location" />
                            <button className="group flex gap-2 items-center w-fit text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-300">
                                <svg className="group-hover:fill-zinc-950 dark:group-hover:fill-zinc-300 fill-zinc-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256">
                                    <path d="M232,120h-8.34A96.14,96.14,0,0,0,136,32.34V24a8,8,0,0,0-16,0v8.34A96.14,96.14,0,0,0,32.34,120H24a8,8,0,0,0,0,16h8.34A96.14,96.14,0,0,0,120,223.66V232a8,8,0,0,0,16,0v-8.34A96.14,96.14,0,0,0,223.66,136H232a8,8,0,0,0,0-16Zm-96,87.6V200a8,8,0,0,0-16,0v7.6A80.15,80.15,0,0,1,48.4,136H56a8,8,0,0,0,0-16H48.4A80.15,80.15,0,0,1,120,48.4V56a8,8,0,0,0,16,0V48.4A80.15,80.15,0,0,1,207.6,120H200a8,8,0,0,0,0,16h7.6A80.15,80.15,0,0,1,136,207.6ZM128,88a40,40,0,1,0,40,40A40,40,0,0,0,128,88Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,152Z">
                                    </path>
                                </svg>
                                Locate Me
                            </button>
                        </div>
                        <button className="font-bold text-white bg-primary py-4 px-5">FIND FOOD</button>
                    </div>
                    {showError && <SearchError text={errorMessage} />}
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
                            <input className='bg-transparent outline-0 grow text-zinc-950 dark:text-zinc-300' type="search" placeholder='Enter area, street name...' onChange={searchSuggestion} />
                            <svg className='fill-zinc-500' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256">
                                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z">
                                </path>
                            </svg>
                        </div>
                        {/* Divider */}
                        <hr className='border-4 border-zinc-300 dark:border-zinc-800' />
                        <div className="py-3 px-4">

                            {/* Location Suggestions */}
                            {locationOptions.length > 0 && locationOptions.map(option => {
                                <SearchAutoComplete heading={option?.structured_formatting?.main_text} subHeading={option?.structured_formatting?.secondary_text
                                } />
                            })
                            }

                            {/* Detect Location */}
                            {locationOptions.length < 1 && <button className="group flex gap-4 items-center w-fit text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-300">
                                <svg className="group-hover:fill-zinc-950 dark:group-hover:fill-zinc-300 fill-zinc-500" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 256 256">
                                    <path d="M232,120h-8.34A96.14,96.14,0,0,0,136,32.34V24a8,8,0,0,0-16,0v8.34A96.14,96.14,0,0,0,32.34,120H24a8,8,0,0,0,0,16h8.34A96.14,96.14,0,0,0,120,223.66V232a8,8,0,0,0,16,0v-8.34A96.14,96.14,0,0,0,223.66,136H232a8,8,0,0,0,0-16Zm-96,87.6V200a8,8,0,0,0-16,0v7.6A80.15,80.15,0,0,1,48.4,136H56a8,8,0,0,0,0-16H48.4A80.15,80.15,0,0,1,120,48.4V56a8,8,0,0,0,16,0V48.4A80.15,80.15,0,0,1,207.6,120H200a8,8,0,0,0,0,16h7.6A80.15,80.15,0,0,1,136,207.6ZM128,88a40,40,0,1,0,40,40A40,40,0,0,0,128,88Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,152Z">
                                    </path>
                                </svg>
                                <p className='flex flex-col items-start'>
                                    <span className='font-bold'>Use Current Location</span>
                                    <span className='text-xs'>Using GPS</span>
                                </p>
                            </button>}

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