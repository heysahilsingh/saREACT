import Img from "../../assets/images/swiggy-not-present.png"
import { useContext, useState } from 'react';
import UserContext from "../../context/UserContext";
import LightBox from "./LightBox";
import LocationSearch from "./LocationSearch/LocationSearch";

interface SwiggyNotPresentProps {
    heading?: string,
    caption?: string
}

const SwiggyNotPresent = (props: SwiggyNotPresentProps) => {
    const { userInfo } = useContext(UserContext)

    const [openLightBox, setOpenLightBox] = useState<boolean>(false);


    return (
        <>
            {openLightBox && (
                <LightBox isOpen={openLightBox} onCLose={() => setOpenLightBox(false)}>
                    <LocationSearch onSelect={() => setOpenLightBox(false)} screen="mob" />
                </LightBox>
            )}

            <div className="flex flex-col bg-[#ccdbea] items-center pb-[50px] border-t-[50px] border-white rounded-3xl">
                <img src={Img} alt={`Swiggy not present in ${userInfo.location.cityInfo.cityName}`} />
                <div className="flex flex-col gap-1 text-center px-14 justify-center items-center">
                    <h1 className="font-bold">{props.heading ? props.heading : "Location not found"}</h1>
                    <p className="text-[14px]">{props.caption ? props.caption : "We don't have any services here till now. Try changing the location."}</p>
                    <button onClick={() => setOpenLightBox(true)} className="w-fit px-6 py-3 mt-6 text-white font-bold text-xs bg-[#6f889f]">CHANGE LOCATION</button>
                </div>
            </div>
        </>
    )
}

export default SwiggyNotPresent