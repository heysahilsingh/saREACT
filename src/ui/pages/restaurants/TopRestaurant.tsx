import { Link } from "react-router-dom"
import CONSTANTS from "../../../constants"

interface TopRestaurantProps{
    imageId: string,
    name: string,
    averageRating: number,
    cuisines: string[],
    link: string,
    offerHeader: string,
    offerSubHeader: string,
    className?: string
}

const TopRestaurant = (props: TopRestaurantProps) => {
    return (
        <Link to={props.link} className={props?.className + " flex flex-col gap-2 items-start justify-start"}>
        <div className="col1 relative">
            <img className="rounded-2xl aspect-[4/5]" src={CONSTANTS.IMG_CDN + props.imageId} alt={props.name} />
            {props.offerHeader && props.offerSubHeader && (
                <div className="absolute w-[90%] -bottom-[5px] left-2/4 -translate-x-2/4 rounded-[4px] shadow-lg bg-white flex flex-col gap-0 leading-[1.2] font-black text-center text-primary leading offer p-1">
                    <span className="text-[13px]">{props.offerHeader}</span>
                    <span className="text-[8px]">• {props.offerSubHeader} •</span>
                </div>
            )}
        </div>
        <div className="col2 text-[14px] pt-[10px] leading-[16px max-w-[80px]">
            <p className="line-clamp-2" style={{display: "-webkit-box"}}>{props.name}</p>
            <p className="pt-[4px] text-zinc-400">{props.cuisines.join(", ")}</p>
        </div>
    </Link>
    )
}

export default TopRestaurant