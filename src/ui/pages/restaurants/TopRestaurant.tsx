import { Link } from "react-router-dom"
import CONSTANTS from "../../../constants"
import { IconStarFilled } from '@tabler/icons-react';

interface TopRestaurantProps {
    imageId: string,
    name: string,
    averageRating: number,
    cuisines: string[],
    areaName: string,
    link: string,
    offerHeader: string,
    offerSubHeader: string,
    className?: string
}

const TopRestaurant = (props: TopRestaurantProps) => {
    return (
        <Link to={props.link} className={props?.className + " hover:scale-95 flex flex-col items-start justify-start"}>
            <div className="col1 w-full relative rounded-2xl overflow-hidden">
                <img className="w-full aspect-[4/5] lg:aspect-[4/3] object-cover" src={CONSTANTS.IMG_CDN + props.imageId} alt={props.name} />
                {props.offerHeader && props.offerSubHeader && (
                    <div className="text-white absolute w-full h-[60%] lg:h-[30%] min-h-fit bottom-0 left-0 flex flex-col lg:flex-row gap-0 lg:gap-2 items-start lg:items-end justify-end lg:justify-start leading-[1.2] p-2 pb-1.5 pl-3 lg:p-3 lg:pl-4 bg-gradient-to-t from-black to-transparent font-black text-[18px] lg:text-[22px]">
                        <span>{props.offerHeader}</span>
                        <span>{props.offerSubHeader}</span>
                    </div>
                )}
            </div>
            <div className="col2 pt-[10px] leading-[120%] lg:leading">
                <p className="line-clamp-2 font-bold lg:text-lg" style={{ display: "-webkit-box" }}>{props.name}</p>
                <div className="rating flex gap-2 pt-1.5 pb-0.5 lg:pb-1 items-center">
                    <div className="relative bg-green-600 rounded-full aspect-square overflow-hidden w-[15px] lg:w-[20px]">
                        <IconStarFilled className="text-white absolute top-2/4 left-2/4 -translate-x-[50%] -translate-y-[50%] w-[60%] h-[60%]" />
                    </div>
                    <p className="lg:text-xm">{props.averageRating}</p>
                </div>
                <p className="text-[13px] lg:text-lg text-zinc-400 line-clamp-1" style={{ display: "-webkit-box" }}>{props.cuisines.join(", ")}</p>
                <p className="text-[13px] lg:text-lg text-zinc-400 line-clamp-1" style={{ display: "-webkit-box" }}>{props.areaName}</p>
            </div>
        </Link>
    )
}

export default TopRestaurant