import { MapPin } from 'phosphor-react';

interface SearchAutoCompleteProps {
    heading: string;
    subHeading: string;
    // callback: Function;
}

const SearchAutoComplete = (props: SearchAutoCompleteProps) => {
    return (
        <>
            <div className="flex items-center gap-4">
                <MapPin className="text-zinc-400 dark:text-zinc-600 min-w-[30px]" size={30} />
                <p className="flex flex-col grow items-start justify-center overflow-hidden border-b-2 border-zinc-100 dark:border-zinc-900 py-3">
                    <span className="font-bold text-zinc-600 dark:text-zinc-300 overflow-hidden whitespace-nowrap text-ellipsis w-full">{props.heading}</span>
                    <span className="text-[14px] text-zinc-500 dark:text-zinc-400 overflow-hidden whitespace-nowrap text-ellipsis w-full">{props.subHeading}</span>
                </p>
            </div>
        </>
    )
}

export default SearchAutoComplete