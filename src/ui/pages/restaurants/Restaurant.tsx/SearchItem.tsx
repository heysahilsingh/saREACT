import { IconArrowNarrowLeft, IconSearch, IconX } from "@tabler/icons-react"
import LightBox from "../../../components/LightBox"
import { ChangeEvent, useContext, useRef, useState } from "react";
import waitAMoment from "../../../../utility/waitAMoment";
import CONSTANTS, { TypeRestaurantInformation } from "../../../../constants";
import MenuItemCard from "../../../components/MenuItemCard";
import UserContext from "../../../../context/UserContext";
import useDeviceDetect from "../../../../hooks/useDeviceDetect";

interface SearchItemProps {
    onClose: () => void,
    restaurantInfo: TypeRestaurantInformation
}

const SearchItem = (props: SearchItemProps) => {

    const {userInfo} = useContext(UserContext);
    const device = useDeviceDetect();

    const refSearchInput = useRef<HTMLInputElement | null>(null)

    const [clearSearch, setClearSearch] = useState(false);

    const [searchResults, setSearchResults] = useState<[] | undefined>(undefined);

    const handleSearch = async (element: ChangeEvent<HTMLInputElement>) => {
        if (!clearSearch) setClearSearch(true)

        const userLat = userInfo.location.cityInfo.latitude;
        const userLng = userInfo.location.cityInfo.longitude;
        const keyword = element.target.value;

        // If input is empty
        if (keyword.trim() === '') {
            setSearchResults([]);
        }

        else if(userLat && userLng && props.restaurantInfo.id){
            try {
                const URL = CONSTANTS.API_SEARCH_IN_RESTRO_ITEMS.getUrl(userLat, userLng, props.restaurantInfo.id, device.isDesk ? "desk" : "mob", keyword);

                console.log(URL);

                const response = await fetch(URL);

                const data = await response.json();

                console.log(data);
                
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <LightBox
            wrapperClasses="w-full bg-white dark:bg-neutral-950"
            closeBtnClasses="hidden"
            onClose={props.onClose}
        >
            <div className="flex flex-col">
                <div className="search-input flex items-center gap-2 py-2 px-4 border-b border-zinc-200 dark:border-zinc-800">
                    <IconArrowNarrowLeft onClick={props.onClose} size={35} stroke={0.7} className="-ml-1" />
                    <input ref={refSearchInput} onChange={waitAMoment(handleSearch, 300)} className="bg-transparent outline-none grow text-zinc-950 dark:text-zinc-300" type="text" placeholder={`Search in ${props.restaurantInfo.name}`} />
                    {!clearSearch && <IconSearch size={22} stroke={1} />}
                    {clearSearch && (
                        <div className="w-[20px] h-[20px] rounded-full relative bg-zinc-300">
                            <IconX
                                className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                                size={15}
                                stroke={1}
                                onClick={() => {
                                    if (refSearchInput.current) {
                                        refSearchInput.current.value = '';
                                        refSearchInput.current.focus();
                                        setClearSearch(false);
                                    }
                                }}
                            />
                        </div>
                    )}
                </div>
                <div className="search-results flex flex-col gap-6 px-4 pb-5">
                    {searchResults && searchResults.map(item => (
                        <div key={item} className="menu">
                            <hr className="border-zinc-200 dark:border-zinc-800 mb-6" />
                            <MenuItemCard menu={item} />
                        </div>
                    ))}
                </div>
            </div>
        </LightBox>
    )
}

export default SearchItem