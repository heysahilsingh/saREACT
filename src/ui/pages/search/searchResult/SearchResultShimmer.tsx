const SearchResultShimmer = () => {
    return (
        <div className="flex flex-col gap-6">
            {[1, 2, 3, 4, 5].map(number => (
                <div className="w-fit flex gap-4 items-center" key={number}>
                    <div className="shimmer-bg border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden min-w-[64px] aspect-square"></div>
                    <div className="flex flex-col gap-2 min-w-[50%] grow">
                        <div className="shimmer-bg w-[200px] h-[12px] rounded-md"></div>
                        <div className="shimmer-bg w-[100px] h-[10px] rounded-md"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SearchResultShimmer