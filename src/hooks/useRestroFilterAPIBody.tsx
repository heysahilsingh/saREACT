import { useState } from 'react';
import { TypeRestroFilterAPIBody } from '../constants';

interface useRestroFilterAPIBodyArgs {
    userLatitude: number | null,
    userLongitude: number | null,
    pageOffset: string
}

type UpdateAPIBodyArgs = {
    parentId: string | null,
    childId: string,
    target: "SORT_CONFIG" | "FACET" | "PAGE_OFFSET"
}

const useRestroFilterAPIBody = (args: useRestroFilterAPIBodyArgs) => {
    const [APIBody, setAPIBody] = useState<TypeRestroFilterAPIBody>({
        filters: {
            isFiltered: true,
            facets: {
                explore: [],
                deliveryTime: [],
                isVeg: [],
                restaurantOfferMultiTd: [],
                costForTwo: [],
                rating: [],
                catalog_cuisines: []
            },
            sortAttribute: "relevance"
        },
        lat: args.userLatitude,
        lng: args.userLongitude,
        widgetOffset: {
            collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: args.pageOffset,
        },
    });

    const handleOpenFilterClick = (args: UpdateAPIBodyArgs) => {
        if (args.target === "FACET" && args.parentId) {
            setAPIBody((prev: TypeRestroFilterAPIBody) => {
                const updatedFacets = { ...prev.filters.facets };

                // Check if the parentId exists as a key in the facets object, create one with an empty array if not.
                if (!(args.parentId in updatedFacets)) {
                    updatedFacets[args.parentId] = [];
                }

                const parentArray = updatedFacets[args.parentId];

                // Check if the args.childId is already present in the parent's array, and remove it if found, or add it if not found.
                if (parentArray.some(option => option.value === args.childId)) {
                    updatedFacets[args.parentId] = parentArray.filter(
                        (option) => option.value !== args.childId
                    );
                } else {
                    updatedFacets[args.parentId].push({ value: args.childId });
                }

                return {
                    ...prev,
                    filters: {
                        ...prev.filters,
                        facets: updatedFacets
                    }
                };
            });
        } else if (args.target === "SORT_CONFIG") {
            setAPIBody((prev: TypeRestroFilterAPIBody) => {
                return {
                    ...prev,
                    filters: {
                        ...prev.filters,
                        sortAttribute: args.childId
                    }
                }
            });
        } else if (args.target === "PAGE_OFFSET") {
            setAPIBody((prev: TypeRestroFilterAPIBody) => {
                return {
                    ...prev,
                    widgetOffset: {
                        collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: args.childId
                    }
                };
            });
        }
    };

    return {
        APIBody: APIBody,
        updateAPIBody: handleOpenFilterClick
    }
}

export default useRestroFilterAPIBody


// const handleOpenFilterClick = (parentId: string, filterOption: FilterOption, method: "ADD" | "REMOVE") => {
//     setAPIBody((prev: TypeRestroFilterAPIBody) => {
//         const updatedFilters = { ...prev.filters };

//         if (method === "ADD") {
//             // if the parentId dosen't exists as a key in the facets object, create one with an empty array.
//             if (!(parentId in updatedFilters.facets)) {
//                 updatedFilters.facets[parentId] = [];
//             }
//             // Add the FilterOption in parent's array
//             updatedFilters.facets[parentId].push({ value: filterOption.id });
//         } else if (method === "REMOVE") {
//             // Remove the filter option if the parent exists
//             if (parentId in updatedFilters.facets) {
//                 updatedFilters.facets[parentId] = updatedFilters.facets[parentId].filter(
//                     (filter) => filter.value !== filterOption.id
//                 );
//             }
//         }

//         return {
//             ...prev,
//             filters: updatedFilters
//         };
//     });
// };