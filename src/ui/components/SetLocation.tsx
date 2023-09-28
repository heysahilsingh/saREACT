import useDeviceDetect from "../../hooks/useDeviceDetect";
import LightBox from "./LightBox"
import LocationSearch from "./LocationSearch/LocationSearch"
import { useState } from 'react';

const SetLocation = () => {

    const device = useDeviceDetect();

    const [reloadButton, setReloadButton] = useState(false);

    return (
        <LightBox
            wrapperClasses={`mr-auto ml-0 relative z-20 bg-white h-full w-full p-3 pt-16 ${reloadButton ? "lg:w-full" : "lg:w-[700px]"} lg:p-10 dark:bg-neutral-900`}
            closeBtnClasses="top-3 right-3 lg:top-8 lg:right-8"
        >
            {reloadButton && (
                <div className="flex flex-col gap-4 items-center justify-center h-[60vh]">
                    <p className="font-bold uppercase text-[40px] leading-[120%] text-center">Please reload the page</p>
                    <button className="bg-primary px-6 py-2.5 font-bold uppercase rounded-md text-white" onClick={() => window.location.reload()}>Reload</button>
                </div>
            )}

            {!reloadButton && <LocationSearch screen={device.isDesk ? "desk" : "mob"} onSelect={() => setReloadButton(true)} />}
        </LightBox>
    )
}

export default SetLocation