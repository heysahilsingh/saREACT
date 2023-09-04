import Img from "../../assets/images/swiggy-not-available.jpeg"
import { useContext, useState } from 'react';
import UserContext from "../../context/UserContext";
import LightBox from "./LightBox";
import LocationSearch from "./LocationSearch/LocationSearch";

interface SwiggyNotAvailableProps {
    heading?: string,
    caption?: string,
}

const SwiggyNotAvailable = (props: SwiggyNotAvailableProps) => {
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
                    <h1 className="font-bold">{props.heading ? props.heading : "Due to operational exigencies, we are temporarily unserviceable"}</h1>
                    <p className="text-[14px]">{props.caption ? props.caption : "Some restaurants around you are not serviceable due to operational exigencies. Please bear with us."}</p>
                    <button onClick={() => setOpenLightBox(true)} className="w-fit px-6 py-3 mt-6 text-white font-bold text-xs bg-[#6f889f]">CHANGE LOCATION</button>
                </div>
            </div>
        </>
    )
}

export default SwiggyNotAvailable