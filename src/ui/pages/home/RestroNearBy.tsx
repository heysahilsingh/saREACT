import CONSTANTS from "../../../constants"
import { Link } from 'react-router-dom';
import { IconStarFilled } from '@tabler/icons-react';

interface RestroNearByProps {
    imgSrc: string,
    offerHeading: string,
    offerSubHeading: string,
    restroName: string,
    deliveryTime: number,
    link: string,
    isPromoted: boolean,
    cuisines: string[],
    costForTwo: string,
    averageRating: string,
    className?: string
}

const RestroNearBy = (props: RestroNearByProps) => {
    return (
        <Link to={props.link} className={props?.className + " w-full flex gap-4 items-center justify-start"}>
            <div className="col1 relative min-w-[22%] max-w-[22%] w-[22%]">
                <img className="rounded-[8px] aspect-[4/4.5] object-cover" src={CONSTANTS.IMG_CDN + props.imgSrc} alt={props.restroName} />
                {props.offerHeading && props.offerSubHeading && (
                    <div className="absolute w-[90%] -bottom-[5px] left-2/4 -translate-x-2/4 rounded-[4px] shadow-lg bg-white flex flex-col gap-0 leading-[1.2] font-black text-center text-primary leading offer p-1">
                        <span className="text-[13px]">{props.offerHeading}</span>
                        <span className="text-[8px]">• {props.offerSubHeading} •</span>
                    </div>
                )}
                {props.isPromoted && <div className="absolute top-2 left-2 opacity-70 rounded-[4px] bg-zinc-600 py-1 px-2 leading-none text-[10px] text-white">Ad</div>}
            </div>

            <div className="col2 grow overflow-hidden text-[14px] pt-[10px] leading-[16px] flex flex-col gap-1.5">
                <p className="name line-clamp-2 font-bold" style={{display: "-webkit-box"}}>{props.restroName}</p>
                <div className="meta flex gap-2 text-xs">
                    <div className="ratings flex gap-2 items-center">
                        <IconStarFilled className="opacity-50" size={12}/>
                        {props.averageRating}
                    </div>
                    •
                    <div className="delivery_time">{props.deliveryTime} min</div>
                    •
                    <div className="cost_two">{props.costForTwo}</div>
                </div>
                <div className="cusines text-zinc-400 overflow-hidden whitespace-nowrap text-ellipsis">{props.cuisines.join(", ")}</div>
            </div>
        </Link>
    )
}

export default RestroNearBy