import { ReactNode, useState } from "react";
import { IconX } from '@tabler/icons-react';


interface LightBoxProps {
    clasName?: string,
    children: ReactNode,
    isOpen: boolean,
    onCLose: () => void
}

const LightBox = (props: LightBoxProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(props.isOpen);

    const closeLightBox = () => {
        setIsOpen(false)
        props.onCLose()
    }

    if (isOpen) {
        return (
            <div className="lightbox fixed top-0 left-0 w-full min-h-full z-[999] flex flex-col items-start justify-start">
                <div className={props?.clasName + " wrapper grow !mr-auto !ml-0 sa-container relative z-20 bg-white h-full w-full p-3 pt-16 lg:w-[700px] lg:p-10 dark:bg-neutral-900"}>
                    {props?.children}
                </div>
                <div className="backdrop z-10 absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)]"></div>
                <IconX onClick={closeLightBox} className="absolute stroke-1 lg:stroke-2 top-3 right-3 lg:top-8 lg:right-8 text-black dark:text-zinc-400 lg:text-white z-20 cursor-pointer" size={40}/>
            </div>
        )
    }
}

export default LightBox