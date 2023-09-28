import { Link } from "react-router-dom"
import CONSTANTS, { TypeRestaurantInformation } from "../../constants"
import { IconStarFilled } from '@tabler/icons-react';
import { routePaths } from "../Ui";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

interface RestroCardVerticleProps {
    className?: string,
    restro: TypeRestaurantInformation
}

const RestroCardVerticle = (props: RestroCardVerticleProps) => {

    const { userInfo } = useContext(UserContext);

    if (props.restro) {
        const link = routePaths.restaurants + "/" + [props.restro.name, props.restro.locality, props.restro.areaName, userInfo.location.cityInfo.cityName, props.restro.id].map(value => value ? value.replace(/[^a-zA-Z0-9]/g, '-') : "").join("-").toLowerCase();

        const { header: offerHeader, subHeader: offerSubheader } = props.restro.aggregatedDiscountInfoV2 || props.restro.aggregatedDiscountInfoV3;

        return (
            <div className={`restro-card-horizontal ${props.className ? props.className : ""}`}>
                <Link to={link} className="restro-card hover:scale-95 flex flex-col items-start justify-start">
                    <div className="col1 w-full relative rounded-2xl overflow-hidden">
                        <img className="w-full aspect-[4/5] lg:aspect-[4/3] object-cover bg-zinc-200 dark:bg-zinc-900" src={CONSTANTS.IMG_CDN + props.restro.cloudinaryImageId} alt={props.restro.name} />
                        {offerHeader && (
                            <div className="text-white absolute w-full h-[30%] min-h-fit bottom-0 left-0 flex flex-col lg:flex-row gap-0 lg:gap-2 items-start lg:items-end justify-end lg:justify-start leading-[1.2] p-2 pb-1.5 pl-3 lg:p-3 lg:pl-4 bg-gradient-to-t from-zinc-800 to-transparent font-black text-[18px] lg:text-[22px]">
                                {offerHeader && <span>{offerHeader}</span>}
                                {offerSubheader && <span>{offerSubheader}</span>}
                            </div>
                        )}
                    </div>
                    <div className="col2 pt-[10px] leading-[120%] lg:leading">
                        <p className="line-clamp-2 font-bold lg:text-lg" style={{ wordBreak: "break-word" }}>{props.restro.name}</p>
                        {props.restro.avgRating && (
                            <div className="rating flex gap-2 pt-1.5 pb-0.5 lg:pb-1 items-center">
                                <div className="relative bg-green-600 rounded-full aspect-square overflow-hidden w-[15px] lg:w-[20px]">
                                    <IconStarFilled className="text-white absolute top-2/4 left-2/4 -translate-x-[50%] -translate-y-[50%] w-[60%] h-[60%]" />
                                </div>
                                <p className="lg:text-xm">{props.restro.avgRating}</p>
                            </div>
                        )}
                        {props.restro.cuisines && (
                            <p className="text-[13px] lg:text-lg text-zinc-400 line-clamp-1" style={{ display: "-webkit-box" }}>{props.restro.cuisines.join(", ")}</p>
                        )}
                        {props.restro.areaName && (
                            <p className="text-[13px] lg:text-lg text-zinc-400 line-clamp-1" style={{ display: "-webkit-box" }}>{props.restro.areaName}</p>
                        )}
                    </div>
                </Link>
            </div>
        )
    }
}

const RestroCardVerticleShimmer = () => (
    <div className="restro-card-shimmer">
        <div className="shimmer-bg w-full aspect-[4/5] lg:aspect-[4/3] rounded-2xl overflow-hidden"></div>
    </div>
)

export { RestroCardVerticleShimmer };
export default RestroCardVerticle;