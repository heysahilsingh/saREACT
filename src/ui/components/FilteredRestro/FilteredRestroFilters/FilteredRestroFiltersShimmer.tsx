const FilteredRestroFiltersShimmer = () => {
    return (
        <div className="filters sticky lg:top-0 top-[0] z-10 bg-white dark:bg-neutral-950 py-3 lg:py-6">
            <div className="flex gap-2 items-center no-scrollbar overflow-scroll">
                {[1,2,3,4,5,6,7,8].map((v: number) => <div key={v} className={"shimmer-bg h-[40px] min-w-[115px] rounded-full"}></div>)}
            </div>
        </div>
    )
}

export default FilteredRestroFiltersShimmer