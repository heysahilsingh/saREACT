import { Link } from "react-router-dom"
import { TypeMenuItem } from "../../../../constants"
import MenuItemCard from "../../../components/MenuItemCard"
import { SearchResultLists } from "../SearchQuery"
import { IconArrowRight, IconStarFilled } from "@tabler/icons-react"
import { routePaths } from "../../../Ui"
import UserContext from "../../../../context/UserContext"
import { useContext } from "react"

interface DishSearchResultProps {
    results: SearchResultLists[]
}

const DishSearchResult = (props: DishSearchResultProps) => {

    const { userInfo } = useContext(UserContext);

    return (
        <div className="flex flex-col gap-5 bg-[#f5f6f8] dark:bg-zinc-800 -mx-4 -mt-6 lg:px-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:pt-3">
            {props.results.map(result => {
                const link = routePaths.restaurants + "/" + [result.restaurant.info.name, result.restaurant.info.locality, result.restaurant.info.areaName, userInfo.location.cityInfo.cityName, result.restaurant.info.id].map(value => value ? value.replace(/[^a-zA-Z0-9]/g, '-') : "").join("-").toLowerCase();

                return (
                    <div key={result.restaurant.info.id + result.info.id} className="flex flex-col gap-5 rounded-[24px] bg-white dark:bg-neutral-950 px-4 py-6 shadow-2xl shadow-[#e8e8e8] dark:shadow-zinc-800">
                        {/* Restro Info */}
                        <Link to={link} className="flex gap-2 items-center justify-between">
                            <div className="flex flex-col gap-1.5 w-[70%] grow text-[#686b78]">
                                <p className="dark:text-zinc-500 font-bold leading-[120%] text-[14px]">By {result.restaurant.info.name}</p>
                                <div className="flex gap-2 text-[13px] leading-none">
                                    <div className="rating flex items-center gap-2">
                                        <IconStarFilled size={12} />
                                        <span>{result.restaurant.info.avgRatingString}</span>
                                    </div>
                                    <span>.</span>
                                    <p>{result.restaurant.info.sla.deliveryTime} MINS</p>
                                </div>
                            </div>
                            <IconArrowRight size={28} stroke={1} className="opacity-60 hover:opacity-100" />
                        </Link>

                        <hr className="w-full bg-zinc-200 dark:bg-zinc-800 h-[1px] border-0" />

                        {/* Dish */}
                        <MenuItemCard promoted={result.restaurant.info.promoted ? true : false} menu={result.info as TypeMenuItem} />
                    </div>
                )
            })}
        </div>
    )
}

export default DishSearchResult