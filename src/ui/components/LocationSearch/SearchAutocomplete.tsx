interface SearchAutoCompleteProps {
    heading: string;
    subHeading: string;
    // callback: Function;
}

const SearchAutoComplete = (props: SearchAutoCompleteProps) => {
    return (
        <>
            <div className="flex items-center gap-4">
                <svg className="fill-zinc-500" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#000000" viewBox="0 0 256 256">
                    <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z">
                    </path>
                </svg>
                <p className="flex flex-col items-start justify-center overflow-hidden border-b-2 border-zinc-100 dark:border-zinc-900 py-3">
                    <span className="font-bold text-zinc-600 dark:text-zinc-300 whitespace-nowrap text-ellipsis w-full">{props.heading}</span>
                    <span className="text-[14px] text-zinc-500 dark:text-zinc-400 whitespace-nowrap text-ellipsis w-full">{props.subHeading}</span>
                </p>
            </div>
        </>
    )
}

export default SearchAutoComplete