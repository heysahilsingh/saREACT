const HomeShimmer = () => {
    return (
        <div className="shimmer flex flex-col gap-12 px-4 pt-4 shimmer-bg-2">
            <div className="flex items-center justify-between gap-4">
                <div className="grow px-3 py-4 pr-10 rounded-[20px] h-[150px] shimmer-bg"></div>
                <div className="grow px-3 py-4 pr-10 rounded-[20px] h-[150px] shimmer-bg"></div>
            </div>

            <div className="">
                <div className="mb-4 h-6 w-[60%] rounded-md shimmer-bg"></div>
                <div className="flex items-start justify-start gap-[3%] overflow-hidden">
                    <div className="min-w-[80px] aspect-[4/7] rounded-lg shimmer-bg"></div>
                    <div className="min-w-[80px] aspect-[4/7] rounded-lg shimmer-bg"></div>
                    <div className="min-w-[80px] aspect-[4/7] rounded-lg shimmer-bg"></div>
                    <div className="min-w-[80px] aspect-[4/7] rounded-lg shimmer-bg"></div>
                    <div className="min-w-[80px] aspect-[4/7] rounded-lg shimmer-bg"></div>
                </div>
            </div>

            <div className="flex gap-4 items-center overflow-hidden">
                <div className="min-w-[80%] aspect-[5/4] rounded-[25px] shimmer-bg"></div>
                <div className="min-w-[80%] aspect-[5/4] rounded-[25px] shimmer-bg"></div>
            </div>

            <div className="">
                <div className="mb-4 h-6 w-[60%] rounded-md shimmer-bg"></div>
                <div className="flex gap-2 overflow-hidden">
                    <div className="min-w-[35%] aspect-[4/6] rounded-2xl shimmer-bg"></div>
                    <div className="min-w-[35%] aspect-[4/6] rounded-2xl shimmer-bg"></div>
                    <div className="min-w-[35%] aspect-[4/6] rounded-2xl shimmer-bg"></div>
                </div>
            </div>
        </div>
    )
}

export default HomeShimmer