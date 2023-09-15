
import { useContext, useEffect, useState } from 'react';
import { routePaths } from '../../Ui';
import { TypeRestroCard } from '../../../constants';
import RestroCard, { RestroCardShimmer } from '../RestroCard';
import UserContext from '../../../context/UserContext';
import FilteredRestroFilters from './FilteredRestroFilters/FilteredRestroFilters';
import FilteredRestroFiltersShimmer from './FilteredRestroFilters/FilteredRestroFiltersShimmer';

export type FilterInfo = {
    id: "deliveryTime" | "catalog_cuisines" | "explore" | "rating" | "isVeg" | "restaurantOfferMultiTd" | "costForTwo" | "sortAttribute" | undefined,
    label: string | undefined,
    subLabel: string | undefined,
    selection: "SELECT_TYPE_MULTISELECT" | "SELECT_TYPE_SINGLESELECT" | undefined,
}

export type FilterOption = {
    id: string | undefined,
    label: string | undefined,
    openFilter: boolean | undefined,
    selected: boolean | undefined,
}

export type FiltersProp = {
    sortConfigs: { key: string, title: string, selected: boolean }[],
    facetList: (FilterInfo & {
        facetInfo: FilterOption[]
    })[]
} | undefined

export type RestrosProp = { info: TypeRestroCard }[] | undefined

interface FilteredRestroProps {
    filters: FiltersProp,
    restros: RestrosProp
}

const FilteredRestro = (props: FilteredRestroProps) => {

    const { userInfo } = useContext(UserContext);
    const [restros, setRestros] = useState<TypeRestroCard[] | undefined>(undefined);
    const [filters, setFilters] = useState<FiltersProp | undefined>(undefined);

    useEffect(() => {
        setRestros(
            props?.restros?.map(restro => restro?.info)
        );

        setFilters(props.filters)

    }, [props.restros, props.filters])

    return (
        <div className="container flex flex-col px-4">
            {/* Filters */}
            {filters ? <FilteredRestroFilters filters={filters} setFilters={setFilters} setRestro={setRestros} /> : <FilteredRestroFiltersShimmer />}

            {/* Restros */}
            <div className="restros lists grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-8 pt-3 lg:pt-5 no-scrollbar overflow-x-scroll overflow-y-hidden">
                {/* Restros SHimmer */}
                {!restros && [1,2,3,4,5,6,7,8,9,10,11,12].map((v: number) => <RestroCardShimmer key={v}/>)}

                {(restros && restros?.length > 0) && restros?.map(restro => {
                    const link = `${routePaths.restaurants}/${[restro.name, restro.locality, restro.areaName, userInfo.location.cityInfo.cityName, restro.id].map(value => value ? value.replace(/[^a-zA-Z0-9]/g, '-') : "").join("-").toLowerCase()}`;

                    return (
                        <RestroCard
                            key={restro.id}
                            imageId={restro.cloudinaryImageId}
                            offerHeader={restro.aggregatedDiscountInfoV3?.header ? restro.aggregatedDiscountInfoV3?.header : restro.aggregatedDiscountInfoV2?.header}
                            offerSubHeader={restro.aggregatedDiscountInfoV3?.subHeader}
                            name={restro.name}
                            avgRating={restro.avgRating}
                            cuisines={restro.cuisines}
                            areaName={restro.areaName}
                            link={link}
                        />
                    )
                })}
            </div>

            <button className='w-full border p-3'>Show More</button>
        </div>
    )
}

export default FilteredRestro