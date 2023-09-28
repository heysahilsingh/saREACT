import CONSTANTS from "../../constants"
import { Link } from 'react-router-dom';
import { IconStarFilled } from '@tabler/icons-react';
import { TypeRestaurantInformation } from "../../constants";
import { routePaths } from "../Ui";
import UserContext from "../../context/UserContext";
import { useContext } from 'react';

interface RestroCardHorizontalProps {
    className?: string,
    restro: TypeRestaurantInformation
}

const RestroCardHorizontal = (props: RestroCardHorizontalProps) => {

    const { userInfo } = useContext(UserContext);

    if (props.restro) {
        const link = routePaths.restaurants + "/" + [props.restro.name, props.restro.locality, props.restro.areaName, userInfo.location.cityInfo.cityName, props.restro.id].map(value => value ? value.replace(/[^a-zA-Z0-9]/g, '-') : "").join("-").toLowerCase();

        const { header: offerHeader, subHeader: offerSubHeader,  headerType: offerType} = props.restro.aggregatedDiscountInfoV2 || props.restro.aggregatedDiscountInfoV3;

        return (
            <div className={`restro-card-horizontal w-full ${props.className ? props.className : ""}`}>
                <Link to={link} className={"w-full flex gap-4 items-center justify-start"}>
                    <div className="col1 relative min-w-[22%] max-w-[22%] w-[22%]">
                        <img className="bg-zinc-200 dark:bg-zinc-900 rounded-[8px] aspect-[4/4.5] object-cover" src={CONSTANTS.IMG_CDN + props.restro.cloudinaryImageId} alt={props.restro.name} />
                        {offerHeader && (
                            <div className={`absolute w-[90%] -bottom-[5px] left-2/4 -translate-x-2/4 rounded-[4px] shadow-lg flex flex-col gap-0 leading-[1.2] font-black text-center leading offer p-1 ${offerType === "HEADER_TYPE_1" ? "text-primary bg-white" : "text-white bg-primary"}`}>
                                {offerHeader && <span className="text-[13px]">{offerHeader}</span>}
                                {offerSubHeader && <span className="text-[8px]">• {offerSubHeader} •</span>}
                            </div>
                        )}
                        {props.restro.promoted && <div className="absolute top-2 left-2 opacity-70 rounded-[4px] bg-zinc-600 py-1 px-2 leading-none text-[10px] text-white">Ad</div>}
                    </div>

                    <div className="col2 grow overflow-hidden w-[50%] text-[14px] pt-[10px] leading-[16px] flex flex-col gap-1.5">
                        <p className="name line-clamp-2 font-bold text-[#3e4152] dark:text-zinc-400">{props.restro.name}</p>
                        <div className="meta flex gap-2 text-xs">
                            <div className="ratings flex gap-2 items-center">
                                <IconStarFilled className="opacity-50" size={12} />
                                {props.restro.avgRating}
                            </div>
                            •
                            <div className="delivery_time">{props.restro.sla.deliveryTime} min</div>
                            •
                            <div className="cost_two">{props.restro.costForTwo}</div>
                        </div>
                        <div className="cusines text-zinc-400 overflow-hidden whitespace-nowrap text-ellipsis">{props.restro.cuisines.join(", ")}</div>
                    </div>
                </Link>
            </div>
        )
    }
}

export default RestroCardHorizontal