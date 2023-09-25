import { useRef } from 'react';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import waitAMoment from '../../../utility/waitAMoment';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useContext } from 'react';
import UserContext from '../../../context/UserContext';
import useDeviceDetect from '../../../hooks/useDeviceDetect';
import { useEffect } from 'react';
import CONSTANTS from '../../../constants';


const Search = () => {

    const {userInfo} = useContext(UserContext);
    const device = useDeviceDetect();

    const refSearchInput = useRef<HTMLInputElement | null>(null)
    const [clearSearch, setClearSearch] = useState(false);
    const [searchResults, setSearchResults] = useState<[] | undefined>(undefined);

    const handleSearch = (element: ChangeEvent<HTMLInputElement>) => {
        if (!clearSearch) setClearSearch(true)

        const keyword = element.target.value;

        // If input is empty
        if (keyword.trim() === '') {
            setSearchResults([]);
            setClearSearch(false)
        }

    }

    // API CALL
    useEffect(() => {
        const userLat = userInfo.location.cityInfo.latitude;
        const userLng = userInfo.location.cityInfo.longitude;

        if(userLat && userLng){
            const fetchData = async () => {
                try {
                    const URL = CONSTANTS.API_PAGE_SEARCH.getUrl(userLat, userLng, device.isDesk ? "desk" : "mob");

                    const response = await fetch(URL);
                    const responseData = await response.json();

                    console.log(responseData?.data?.cards?.map(card => card.card.card));
                    
                } catch (error) {
                    console.log(error)
                }
            }

            fetchData()
        }

    }, [])

    return (
        <div className="flex flex-col">
            <div className="search-input p-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 py-3 px-4 border border-zinc-300 dark:border-zinc-700 rounded-lg w-full">
                    <input ref={refSearchInput} onChange={waitAMoment(handleSearch, 300)} className="bg-transparent outline-none grow text-zinc-950 dark:text-zinc-300" type="text" placeholder="Search for restaurants and food" />
                    {!clearSearch && <IconSearch size={22} stroke={1} />}
                    {clearSearch && (
                        <IconX
                            className="dark:text-zinc-300"
                            size={24}
                            stroke={1.5}
                            onClick={() => {
                                if (refSearchInput.current) {
                                    refSearchInput.current.value = '';
                                    refSearchInput.current.focus();
                                    setClearSearch(false);
                                }
                            }}
                        />
                    )}
                </div>
            </div>
            <div className="search-results flex flex-col gap-6 px-4 pb-5">
                {searchResults && searchResults.map(item => (
                    <div key={item} className="menu">
                        <div className="sss"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Search