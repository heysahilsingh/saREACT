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
import Page from '../Page';
import { Link } from 'react-router-dom';

type PageData = {
    popularCuisines: {
        entityId: string,
        id: string,
        imageId: string
    }[] | undefined,
    popularInstamart: {
        entityId: string,
        id: string,
        imageId: string
    }[] | undefined,
}

type searchResults = {
    category: string,
    cloudinaryId: string,
    highlightedText: string,
    metadata: string,
    subCategory: string,
    tagToDisplay: "Instamart" | "DIsh" | "Restaurant",
    text: string,
    type: string
}[] | undefined

const Search = () => {

    const { userInfo } = useContext(UserContext);
    const device = useDeviceDetect();

    const [pageData, setPageData] = useState<PageData>({
        popularCuisines: undefined,
        popularInstamart: undefined
    });
    // Load pageData at first
    useEffect(() => {
        const userLat = userInfo.location.cityInfo.latitude;
        const userLng = userInfo.location.cityInfo.longitude;

        if (userLat && userLng) {
            const fetchData = async () => {
                try {
                    const URL = CONSTANTS.API_PAGE_SEARCH.getUrl(userLat, userLng, device.isDesk ? "desk" : "mob");

                    const response = await fetch(URL);
                    const responseData = await response.json();
                    const responseCards = responseData?.data?.cards?.map((card: { card: { card: object } }) => card.card.card);

                    if (responseCards) {
                        setPageData({
                            popularCuisines: responseCards.find((card: { id: string }) => card.id === "PopularCuisinessearchpage")?.gridElements?.infoWithStyle?.info,
                            popularInstamart: responseCards.find((card: { id: string }) => card.id === "PopularCategoriessearchpage")?.gridElements?.infoWithStyle?.info
                        })
                    }

                } catch (error) {
                    console.log(error)
                }
            }

            fetchData()
        }

    }, [])

    const refSearchInput = useRef<HTMLInputElement | null>(null)
    const [clearSearch, setClearSearch] = useState(false);
    const [searchResults, setSearchResults] = useState<searchResults | undefined>(undefined);

    // Handle searching
    const handleSearch = async (element: ChangeEvent<HTMLInputElement>) => {
        if (!clearSearch) setClearSearch(true)

        const keyword = element.target.value;

        // If input is empty
        if (keyword.trim() === '') {
            setSearchResults(undefined);
            setClearSearch(false)
        } else {
            const userLat = userInfo.location.cityInfo.latitude;
            const userLng = userInfo.location.cityInfo.longitude;

            if (userLat && userLng) {
                try {
                    const URL = CONSTANTS.API_PAGE_SEARCH_QUERY.getUrl(userLat, userLng, device.isDesk ? "desk" : "mob", keyword);

                    const response = await fetch(URL);
                    const responseData = await response.json();
                    const results = responseData?.data?.suggestions;

                    if (results) setSearchResults(results)

                    console.log(results);

                } catch (error) {
                    console.log(error);
                }
            }
        }

    }

    // Bold HighlightedText
    const boldHighlightedText = (text: string) => {
        const parts = text.split(/\{\{(.*?)\}\}/);

        return (
            <p>
                {parts.map((part, index) =>
                    index % 2 === 1 ? (
                        <span key={index} className='font-bold'>{part}</span>
                    ) : (
                        <span key={index}>{part}</span>
                    )
                )}
            </p>
        );
    }

    return (
        <Page pageName='search'>
            <div className="flex flex-col lg:max-w-[800px] lg:mx-auto">
                <div className="search-input sticky top-0 p-4 pb-6 lg:py-8 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-neutral-950">
                    <div className="flex items-center gap-2 py-3 px-4 border border-zinc-300 dark:border-zinc-700 rounded-xl w-full">
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
                {/* Pre Search */}
                {!searchResults && (
                    <div className="pre-search flex gap-3 lg:gap-5 flex-col bg-[#f5f6f8] dark:bg-zinc-900">
                        {pageData.popularInstamart && (
                            <div className="cuisines py-5 px-4 bg-white dark:bg-neutral-950">
                                <h2 className="font-bold text-xl mb-4 lg:mb-3 lg:mt-6">Popular on <span className='text-[#982160] font-black'>Instamart</span></h2>
                                <div className="items flex no-scrollbar overflow-y-scroll">
                                    {pageData.popularInstamart.map(cuisine => {
                                        return (
                                            <div className="min-w-[25%] lg:min-w-[15%]" key={cuisine.id}>
                                                <img src={CONSTANTS.IMG_CDN + cuisine.imageId} alt="" />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                        {pageData.popularCuisines && (
                            <div className="cuisines py-5 px-4 bg-white dark:bg-neutral-950">
                                <h2 className="font-bold text-xl mb-4 lg:mb-3 lg:mt-6">Popular Cuisines</h2>
                                <div className="items flex no-scrollbar overflow-y-scroll">
                                    {pageData.popularCuisines.map(cuisine => {
                                        return (
                                            <div className="min-w-[25%] lg:min-w-[15%]" key={cuisine.id}>
                                                <img src={CONSTANTS.IMG_CDN + cuisine.imageId} alt="" />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Search Results */}
                {searchResults && (
                    <div className="flex flex-col gap-6 px-4 py-6">
                        {searchResults.map(result => {
                            const link = "";

                            return (
                                <div className="w-fit" key={result.metadata + result.text}>
                                    <Link to={link} className='flex gap-4 items-center'>
                                        <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden w-[64px] h-[64px]">
                                            <img className='object-cover w-full h-full bg-zinc-100 dark:bg-zinc-900' src={CONSTANTS.IMG_CDN + result.cloudinaryId} alt={result.category} />
                                        </div>
                                        <div className="flex flex-col gap-1 leading-none">
                                            <div className='text-[15px]'>{boldHighlightedText(result.highlightedText)}</div>
                                            <p className={`text-[14px] ${result.tagToDisplay === "Instamart" ? "text-[#982160]" : ""}`}>{result.tagToDisplay}</p>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </Page>
    )
}

export default Search