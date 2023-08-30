import { IconMapPin } from '@tabler/icons-react';

interface SearchAutoCompleteProps {
    heading: string;
    subHeading: string;
    onClick: () => void;
}

const SearchAutoComplete = (props: SearchAutoCompleteProps) => {
    return (
        <>
            <div onClick = {props.onClick} className="cursor-pointer flex items-start gap-2">
                <IconMapPin className="text-zinc-400 dark:text-zinc-600 min-w-[30px]" size={25} stroke={1.5}></IconMapPin>
                <p className="flex flex-col grow items-start justify-center overflow-hidden border-b-2 border-zinc-100 dark:border-zinc-900 pb-3 mb-3">
                    <span className="font-bold text-zinc-600 dark:text-zinc-300 overflow-hidden whitespace-nowrap text-ellipsis w-full">{props.heading}</span>
                    <span className="text-[14px] text-zinc-500 dark:text-zinc-400 overflow-hidden whitespace-nowrap text-ellipsis w-full">{props.subHeading}</span>
                </p>
            </div>
        </>
    )
}

export default SearchAutoComplete