import CONSTANTS from "../../../constants"
import { Link } from 'react-router-dom';

interface TopPicksProps {
    imgSrc: string,
    offerHeading: string,
    offerSubHeading: string,
    restroName: string,
    deliveryTime: number,
    link: string,
    isPromoted: boolean,
    className?: string
}

const TopPicks = (props: TopPicksProps) => {
    return (
        <Link to={props.link} className={props?.className + " flex flex-col gap-2 items-start justify-center"}>
            <div className="col1 relative">
                <img className="bg-zinc-200 dark:bg-zinc-900 rounded-[8px] aspect-square" src={CONSTANTS.IMG_CDN + props.imgSrc} alt={props.restroName} />
                {props.offerHeading && props.offerSubHeading && (
                    <div className="absolute w-[90%] -bottom-[5px] left-2/4 -translate-x-2/4 rounded-[4px] shadow-lg bg-white flex flex-col gap-0 leading-[1.2] font-black text-center text-primary leading offer p-1">
                        <span className="text-[13px]">{props.offerHeading}</span>
                        <span className="text-[8px]">• {props.offerSubHeading} •</span>
                    </div>
                )}
                {props.isPromoted && <div className="absolute top-2 left-2 opacity-70 rounded-[4px] bg-zinc-600 py-1 px-2 leading-none text-[10px] text-white">Ad</div>}
            </div>
            <div className="col2 text-[14px] pt-[10px] leading-[16px] max-w-[80px]">
                <p className="line-clamp-2" style={{display: "-webkit-box"}}>{props.restroName}</p>
                <p className="pt-[4px] text-zinc-400">{props.deliveryTime} min</p>
            </div>
        </Link>
    )
}

export default TopPicks