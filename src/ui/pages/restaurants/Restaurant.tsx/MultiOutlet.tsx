import CONSTANTS, { TypeRestaurantInformation } from "../../../../constants"
import LightBox from "../../../components/LightBox"
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import UserContext from "../../../../context/UserContext";
import useDeviceDetect from "../../../../hooks/useDeviceDetect";

interface MultiOutletProps {
    restroInfo: TypeRestaurantInformation,
    onClose: () => void,
}

const MultiOutlet = (props: MultiOutletProps) => {

    const device = useDeviceDetect();
    const { userInfo } = useContext(UserContext);

    const [outlets, setOutlets] = useState([]);

    // Fetch Outlets
    useEffect(() => {
        const fetchOutlets = async () => {
            try {
                const URL = CONSTANTS.API_GET_RESTRO_OUTLET.getUrl(device.isDesk ? "desk" : "mob");

                const body = { "menuId": "256254", "lat": 28.6480384, "lng": 77.1344946, "_csrf": "mrJANXwhQ0dp-rBuMxFXAOnmBPyVk5yNCUJRjRQM" };

                const header = new Headers({
                    "Content-Type": "application/json",
                    "Cookie": "_device_id=47489116-2393-3a5d-2894-8d2a2352cd96; Max-Age=31536000; Domain=www.swiggy.com; Path=/; Expires=Mon, 23 Sep 2024 02:57:11 GMT; HttpOnly; Secure; _guest_tid=6c4227f8-286a-48d8-8b39-b461425449de; Max-Age=86400; Domain=www.swiggy.com; Path=/; Expires=Mon, 25 Sep 2023 02:57:11 GMT; HttpOnly; Secure; _sid=9i8eb10d-d3e0-4480-b0be-6e19c0bf1c91; Max-Age=10800; Domain=www.swiggy.com; Path=/; Expires=Sun, 24 Sep 2023 05:57:11 GMT; HttpOnly; Secure; _swuid=47489116-2393-3a5d-2894-8d2a2352cd96; Max-Age=31536000; Domain=www.swiggy.com; Path=/; Expires=Mon, 23 Sep 2024 02:57:11 GMT; HttpOnly; Secure"
                });

                // Request options
                const options = {
                    method: "POST",
                    headers: header,
                    body: JSON.stringify(body)
                };

                const response = await fetch(URL, options);
                const responseData = await response.json();

                if(responseData) setOutlets(responseData)

                console.log(responseData);

            } catch (error) {
                console.log(error);
            }
        }


        fetchOutlets()
    }, [userInfo])

    return (
        <LightBox wrapperClasses="w-full bg-white dark:bg-neutral-950" closeBtnClasses="top-4 left-4" onClose={props.onClose} >
            <div className="flex flex-col">
                <div className="bg-slate-100 dark:bg-zinc-800 p-4 pt-28">
                    <div className="flex flex-col leading-[120%]">
                        <img className="w-[100px] aspect-square h-auto mb-4" src={CONSTANTS.IMG_CDN + props.restroInfo.cloudinaryImageId} alt="" />
                        <p className="text-[15px] font-semibold">Choose {props.restroInfo.name} Outlet</p>
                        {(outlets || []).length > 0 && (
                            <span className="text-xs">{outlets.length} outlets near you</span>
                        )}
                    </div>
                </div>
                <div className="outlets">
                    <ul></ul>
                </div>
            </div>
        </LightBox>
    )
}

export default MultiOutlet