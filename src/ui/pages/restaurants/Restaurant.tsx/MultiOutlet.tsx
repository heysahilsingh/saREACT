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
                    // "authority": "www.swiggy.com",
                    // "method": "POST",
                    // "path": "/mapi/menu/api/v1/json/layout-section/MENU_MULTI_OUTLET",
                    // "scheme": "https",
                    // "__fetch_req__": "true",
                    // "Accept": "/",
                    // "Accept-Encoding": "gzip, deflate, br",
                    // "Accept-Language": "en-US,en;q=0.9",
                    // "Cache-Control": "no-cache",
                    // "Content-Length": "104",
                    // "Origin": "https://www.swiggy.com",
                    // "Pragma": "no-cache",
                    // "Referer": "https://www.swiggy.com/restaurants/kfc-epicuria-eros-mall-rajouri-garden-delhi-256254/?restaurant_id=256254",
                    // "Sec-Fetch-Dest": "empty",
                    // "Sec-Fetch-Mode": "cors",
                    // "Sec-Fetch-Site": "same-origin",

                    "Cookie": "_device_id=1f498a0c-aa32-410a-eac2-1e05a66ceef8; _swuid=1f498a0c-aa32-410a-eac2-1e05a66ceef8; __SW=fIgXnKNRNsofEBjdni_XJj-S3Cwg-C8D; _guest_tid=7618ba58-5af3-4277-8e98-fd6c1b051d4b; _sid=9hufbe4a-6be8-478e-8717-d029b7b597d3; WZRK_G=5cea0e716ab3483b95226258681f7d3c; WZRK_S_W86-ZZK-zR6Z=%7B%22p%22%3A1%7D; userLocation={%22lat%22:28.6480384%2C%22lng%22:77.1344946%2C%22address%22:%22Block%20G%2C%20Ramesh%20Nagar%2C%20Delhi%2C%20110015%2C%20India%22%2C%22area%22:%22%22%2C%22id%22:%22%22}; dadl=true; deliveryAddressId=",
                    
                    // "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
                });

                // Request options
                const options = {
                    method: "POST",
                    headers: header,
                    body: JSON.stringify(body)
                };

                const response = await fetch(URL, options);
                const responseData = await response.json();

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