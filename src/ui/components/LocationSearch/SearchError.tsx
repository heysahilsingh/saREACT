interface SearchErrorProps {
    text: string
}

const SearchError = (props: SearchErrorProps) => {
    return (
        <>
        <div className="py-3 px-4 lg:py-5 lg:px-6 bg-red-500 dark:bg-red-800 text-zinc-100">{props.text}</div>
        </>
    )
}

export default SearchError