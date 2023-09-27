import { useContext, useEffect, useState } from "react"
import SearchInput from "./SearchInput"
import CONSTANTS, { TypeMenuItem, TypeRestaurantInformation } from "../../../constants"
import UserContext from "../../../context/UserContext"
import useDeviceDetect from "../../../hooks/useDeviceDetect"
import { useSearchParams } from "react-router-dom"
import SearchResultShimmer from "./searchResult/SearchResultShimmer"
import DefaultSearchResult, { DefaultSearchResultType } from "./searchResult/DefaultSearchResult"
import capitalizeWord from "../../../utility/capitalizeWord"

type SearchNavType = {
    id: string,
    title: string,
    selected?: boolean
}

type SearchResultLists = {
    "@type": string,
    info: TypeMenuItem | TypeRestaurantInformation,
    restaurant: { info: TypeRestaurantInformation }
}

type PageDataType = {
    initial: {
        selectedNav: SearchNavType,
        lists: SearchResultLists
    } | undefined,
    searched: DefaultSearchResultType[] | undefined
}

const SearchQuery = () => {

    const { userInfo } = useContext(UserContext);
    const device = useDeviceDetect();
    const [searchParams] = useSearchParams();

    const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("query") || "");
    const [isFetchingPageData, setIsFetchingPageData] = useState(false);
    // const [selectedNavTab, setSelectedNavTab] = useState<string | undefined>(undefined);

    // Page Data
    const [pageData, setPageData] = useState<PageDataType | undefined>({
        initial: undefined,
        searched: undefined
    });

    // Load Initial Page Data
    useEffect(() => {
        fetchPageData("INITIAL", searchQuery)
    }, [searchParams])

    useEffect(() => {
        if (pageData?.initial) console.log(pageData.initial.lists);
    }, [pageData])

    // fetchData function
    const fetchPageData = async (dataType: "INITIAL" | "SEARCHED", query: string, navTab?: SearchNavType) => {
        setIsFetchingPageData(true);

        const userLat = userInfo.location.cityInfo.latitude;
        const userLng = userInfo.location.cityInfo.longitude;

        if (!(userLat && userLng && query && query.trim() !== '')) {
            setIsFetchingPageData(false);
            return;
        }

        try {
            let URL: string;

            if (dataType === "INITIAL") {
                URL = CONSTANTS.API_PAGE_SEARCH_SPECIFIC_RESULT.getUrl(userLat, userLng, device.isDesk ? "desk" : "mob", query, (navTab?.id ? navTab?.id : undefined));
            } else if (dataType === "SEARCHED") {
                URL = CONSTANTS.API_PAGE_SEARCH_DEFAULT_RESULT.getUrl(userLat, userLng, device.isDesk ? "desk" : "mob", query);
            } else {
                setIsFetchingPageData(false);
                return;
            }

            const response = await fetch(URL);
            const responseData = await response.json();

            if (dataType === "INITIAL") {
                const responseCards = responseData?.data?.cards;

                if (responseCards) {
                    const navData = responseCards.find((card: { card: { card: { "@type": string } } }) => card?.card?.card["@type"] === "type.googleapis.com/swiggy.gandalf.widgets.v2.Navigation")?.card?.card?.tab;
                    const selectedNavData: SearchNavType = navData?.find((nav: SearchNavType) => nav?.selected);

                    if (selectedNavData || navTab) {
                        const navToUse = selectedNavData || navTab;
                        const listsData = responseCards.find((card: { groupedCard: { cardGroupMap: object } }) => card?.groupedCard?.cardGroupMap)?.groupedCard?.cardGroupMap;
                        const extractedListCards = listsData[navToUse.id]?.cards?.map((card: { card: object }) => card?.card)?.map((card: { card: object }) => card?.card)?.filter((card: { "@type": string }) => card["@type"] === `type.googleapis.com/swiggy.presentation.food.v2.${capitalizeWord(navToUse.id)}`);

                        // Set pageData
                        setPageData({
                            initial: {
                                selectedNav: navToUse,
                                lists: extractedListCards,
                            },
                            searched: undefined,
                        });
                    }
                }
            } else if (dataType === "SEARCHED") {
                const results = responseData?.data?.suggestions;

                if (results) {
                    
                    // Set pageData
                    setPageData({
                        initial: undefined,
                        searched: results,
                    });
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsFetchingPageData(false);
        }
    };


    return (
        <div className="flex flex-col lg:max-w-[800px] lg:mx-auto">
            <div className="search-input flex flex-col gap-4 sticky top-0 p-4 pb-4 lg:py-8 bg-white dark:bg-neutral-950">
                <SearchInput showBackButton={true} inputValue={searchQuery} searchFunction={inputValue => {
                    setSearchQuery(inputValue),
                        fetchPageData("SEARCHED", inputValue)
                }} />
                {pageData?.initial && (
                    <div className="flex gap-2">
                        {[{ id: "RESTAURANT", title: "Restaurants" }, { id: "DISH", title: "Dishes" }].map(nav => (
                            <div
                                className={`${pageData.initial?.selectedNav?.id === nav.id && "text-white bg-[#3e4152] dark:bg-primary"} font-semibold border border-zinc-200 dark:border-zinc-800 rounded-full leading-none py-2.5 px-4`}
                                onClick={() => {
                                    fetchPageData("INITIAL", searchQuery, nav)
                                }}
                                key={nav.id}>
                                {nav.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="results flex flex-col gap-6 px-4 py-6 border-t-8 border-zinc-200 dark:border-zinc-800">
                {/* Shimmer */}
                {isFetchingPageData && <SearchResultShimmer />}

                {/* Page Data */}
                {!isFetchingPageData && (
                    <>
                        {/* Show Default Search Results */}
                        {pageData?.searched && <DefaultSearchResult results={pageData?.searched} />}
                    </>
                )}
            </div>
        </div>
    )
}

export default SearchQuery