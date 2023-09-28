import FiltersShimmer from "../../components/FilterableRestro/filters/FiltersShimmer"
import { RestroCardVerticleShimmer } from "../../components/RestroCardVertical"

const CollectionsShimmer = () => {
    return (
        <div className="flex flex-col gap-2 p-4">
            <div className="banner shimmer-bg rounded-lg w-full h-auto aspect-[5/3] lg:aspect-auto lg:h-[40px] lg:w-[30%]"></div>
            <div className="flex flex-col">
                <FiltersShimmer />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-8 pt-3 lg:pt-5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(() => <RestroCardVerticleShimmer key={Math.random()} />)}
                </div>
            </div>
        </div>
    )
}

export default CollectionsShimmer