import { Link } from "react-router-dom"
import CONSTANTS from "../../constants"
import { IconStarFilled } from '@tabler/icons-react';

interface RestroCardProps {
    imageId: string,
    name: string,
    avgRating: number,
    cuisines: string[],
    areaName: string,
    link: string,
    offerHeader: string,
    offerSubHeader: string,
    className?: string
}

const RestroCard = (props: RestroCardProps) => {
    return (
        <div className={props.className && props.className + "restro-card"}>
            <Link to={props.link && props.link} className="restro-card hover:scale-95 flex flex-col items-start justify-start">
                <div className="col1 w-full relative rounded-2xl overflow-hidden">
                    {props.imageId && (
                        <img className="w-full aspect-[4/5] lg:aspect-[4/3] object-cover bg-zinc-200 dark:bg-zinc-900" src={CONSTANTS.IMG_CDN + props.imageId} alt={props.name && props.name} />
                    )}
                    {(props.offerHeader || props.offerSubHeader) && (
                        <div className="text-white absolute w-full h-[30%] min-h-fit bottom-0 left-0 flex flex-col lg:flex-row gap-0 lg:gap-2 items-start lg:items-end justify-end lg:justify-start leading-[1.2] p-2 pb-1.5 pl-3 lg:p-3 lg:pl-4 bg-gradient-to-t from-zinc-800 to-transparent font-black text-[18px] lg:text-[22px]">
                            {props.offerHeader && <span>{props.offerHeader}</span>}
                            {props.offerSubHeader && <span>{props.offerSubHeader}</span>}
                        </div>
                    )}
                </div>
                <div className="col2 pt-[10px] leading-[120%] lg:leading">
                    <p className="line-clamp-2 font-bold lg:text-lg" style={{ wordBreak: "break-word" }}>{props.name}</p>
                    {props.avgRating && (
                        <div className="rating flex gap-2 pt-1.5 pb-0.5 lg:pb-1 items-center">
                            <div className="relative bg-green-600 rounded-full aspect-square overflow-hidden w-[15px] lg:w-[20px]">
                                <IconStarFilled className="text-white absolute top-2/4 left-2/4 -translate-x-[50%] -translate-y-[50%] w-[60%] h-[60%]" />
                            </div>
                            <p className="lg:text-xm">{props.avgRating}</p>
                        </div>
                    )}
                    {props.cuisines && (
                        <p className="text-[13px] lg:text-lg text-zinc-400 line-clamp-1" style={{ display: "-webkit-box" }}>{props.cuisines.join(", ")}</p>
                    )}
                    {props.areaName && (
                        <p className="text-[13px] lg:text-lg text-zinc-400 line-clamp-1" style={{ display: "-webkit-box" }}>{props.areaName}</p>
                    )}
                </div>
            </Link>
        </div>
    )
}

const RestroCardShimmer = () => (
    <div className="restro-card-shimmer">
        <div className="shimmer-bg w-full aspect-[4/5] lg:aspect-[4/3] rounded-2xl overflow-hidden"></div>
    </div>
)

export { RestroCardShimmer };
export default RestroCard;