import React, { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { IconX } from '@tabler/icons-react';

interface LightBoxProps {
    children: ReactNode,
    wrapperClasses: string,
    closeBtnClasses: string,
    onClose?: () => void
}

const LightBox = (props: LightBoxProps) => {
    const closeLightBox = () => {
        if (props.onClose) props.onClose();
    }

    const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const element = document.getElementById("lb");
        if (element) {
            setPortalContainer(element);
        }
    }, []);

    if (!portalContainer) {
        return null; // Return null if the portal container is not found
    }

    return ReactDOM.createPortal(
        <div className="lightbox fixed top-0 left-0 w-full min-h-full z-[999] flex flex-col items-start justify-start">
            <div className={props?.wrapperClasses + " wrapper grow z-20"}>
                {props?.children}
            </div>
            <div className="backdrop z-10 absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)]"></div>
            <IconX onClick={closeLightBox} className={props?.closeBtnClasses + " absolute stroke-1 lg:stroke-2 z-20 cursor-pointer"} size={40} />
        </div>,
        portalContainer
    );
}

export default LightBox;