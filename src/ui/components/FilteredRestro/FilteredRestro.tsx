
import { useState } from 'react';
import { routePaths } from '../../Ui';
import { TypeRestroCard } from '../../../constants';

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
} | null

export type RestrosProp = TypeRestroCard[] | null

interface FilteredRestroProps {
    filters: FiltersProp,
    restros: RestrosProp
}

const FilteredRestro = (props: FilteredRestroProps) => {

    const [restros, setRestros] = useState(props.restros);

    console.log(props);

    return (
        <div className="lists grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-8 pt-3 lg:pt-5 no-scrollbar overflow-x-scroll overflow-y-hidden">
            {restros?.map(restro => {

                const link = routePaths.restaurants + "/" + [restro.name, restro.locality, restro.areaName, userInfo.location.cityInfo.cityName, restro.id].map(value => value ? value.replace(/[^a-zA-Z0-9]/g, '-') : "").join("-").toLowerCase();

                return (
                    <TopRestaurant
                        key={restro?.id}
                        name={restro?.name}
                        link={link}
                        averageRating={restro?.avgRating}
                        cuisines={restro?.cuisines}
                        areaName={restro?.areaName}
                        imageId={restro?.cloudinaryImageId}
                        offerHeader={restro?.aggregatedDiscountInfoV3?.header}
                        offerSubHeader={restro?.aggregatedDiscountInfoV3?.subHeader}
                        className="min-w-[35% lg:min-w-[27%]"
                    />
                )
            })}
        </div>
    )
}

export default FilteredRestro