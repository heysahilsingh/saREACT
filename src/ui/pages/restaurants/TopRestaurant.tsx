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
                <img className="w-full aspect-[4/5] object-cover" src={CONSTANTS.IMG_CDN + props.imageId} alt={props.name} />
                {props.offerHeader && props.offerSubHeader && (
                    <div className="text-white absolute w-full h-[60%] bottom-0 left-0 flex flex-col gap-0 items-start justify-end leading-[1.2] p-2 pb-1.5 pl-3 bg-gradient-to-t from-black to-transparent font-black text-[18px]">
                        <span className="">{props.offerHeader}</span>
                        <span className="">{props.offerSubHeader}</span>
                    </div>
                )}
            </div>
            <div className="col2 text-[14px] pt-[10px] leading-[16px]">
                <p className="line-clamp-2 font-bold" style={{ display: "-webkit-box" }}>{props.name}</p>
                <div className="rating flex gap-2 pt-1 pb-1.5">
                    <div className="relative bg-green-600 rounded-full aspect-square overflow-hidden w-[15px]">
                        <IconStarFilled className="text-white absolute top-2/4 left-2/4 -translate-x-[50%] -translate-y-[50%] w-[60%] h-[60%]" />
                    </div>
                    <p>{props.averageRating}</p>
                </div>
                <p className="text-[13px] text-zinc-400 line-clamp-1" style={{ display: "-webkit-box" }}>{props.cuisines.join(", ")}</p>
                <p className="text-[13px] text-zinc-400 line-clamp-1" style={{ display: "-webkit-box" }}>{props.areaName}</p>
            </div>
        </Link>
    )
}

export default TopRestaurant