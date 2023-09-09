import { ReactNode } from "react";
import { IconX } from '@tabler/icons-react';


interface LightBoxProps {
    children: ReactNode,
    wrapperClasses: string,
    closeBtnClasses: string,
    onCLose?: () => void
}

const LightBox = (props: LightBoxProps) => {

    const closeLightBox = () => {
        if (props.onCLose) props.onCLose()
    }

    return (
        <div className="lightbox fixed top-0 left-0 w-full min-h-full z-[999] flex flex-col items-start justify-start">
            <div className={props?.wrapperClasses + " wrapper grow"}>
                {props?.children}
            </div>
            <div className="backdrop z-10 absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.8)]"></div>
            <IconX onClick={closeLightBox} className={props?.closeBtnClasses + " absolute stroke-1 lg:stroke-2 z-20 cursor-pointer"} size={40} />
        </div>
    )
}

export default LightBox