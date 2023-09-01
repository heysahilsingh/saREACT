import CONSTANTS from "../../../constants"
import { Link } from 'react-router-dom';

interface TopPicksProps {
    imgSrc: string,
    offerHeading: string,
    offerSubHeading: string,
    restroName: string,
    deliveryTime: number,
    link: string
}

const TopPicks = (props: TopPicksProps) => {
    return (
        <Link to={props.link} className="flex flex-col gap-2 items-start justify-center">
            <div className="col1 relative">
                <img className="rounded-[8px]" src={CONSTANTS.IMG_CDN + props.imgSrc} alt={props.restroName} />
                {/* <div className="absolute -bottom-[5px] left-2/4 -translate-x-2/4 rounded-[4px] shadow-lg bg-white flex flex-col gap-0 leading-[1.2] font-bold text-center text-primary leading offer py-1 px-2">
                    <span className="text-[0.93rem]">{props.offerHeading}</span>
                    <span className="text-[0.57rem]">• {props.offerSubHeading} •</span>
                </div> */}

                {props.offerHeading && props.offerSubHeading && (
                    <div className="absolute -bottom-[5px] left-2/4 -translate-x-2/4 rounded-[4px] shadow-lg bg-white flex flex-col gap-0 leading-[1.2] font-bold text-center text-primary leading offer py-1 px-2">
                        <span className="text-[0.93rem]">{props.offerHeading}</span>
                        <span className="text-[0.57rem]">• {props.offerSubHeading} •</span>
                    </div>
                )}
            </div>
            <div className="col2">
                <p>{props.restroName}</p>
                <span>{props.deliveryTime}</span>
            </div>
        </Link>
    )
}

export default TopPicks