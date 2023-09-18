import { createContext, useState } from 'react';
import { TypeRestroFilterAPIBody } from '../constants';
import { useContext } from 'react';
import UserContext from './UserContext';

// Create the initial context
export const initialAPIBody: TypeRestroFilterAPIBody = {
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
    lat: 0,
    lng: 0,
    widgetOffset: {
        collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: "10",
    },
};

// FilterableRestroAPIBodyContext Interface
interface FilterableRestroAPIBodyContextInterface {
    APIBody: TypeRestroFilterAPIBody;
    updateAPIBody: (newBody: TypeRestroFilterAPIBody) => void;
}

const FilterableRestroAPIBodyContext = createContext<FilterableRestroAPIBodyContextInterface>({
    APIBody: initialAPIBody,
    updateAPIBody: () => { }
});

FilterableRestroAPIBodyContext.displayName = "FilterableRestroAPIBodyContext";

export const FilterableRestroAPIBodyContextProvider = (props: React.PropsWithChildren<object>) => {
    const {userInfo} = useContext(UserContext);

    const [APIBody, updateAPIBody] = useState<TypeRestroFilterAPIBody>({
        ...initialAPIBody,
        lat: userInfo.location.cityInfo.latitude,
        lng: userInfo.location.cityInfo.longitude,
    });

    const contextValue: FilterableRestroAPIBodyContextInterface = {
        APIBody,
        updateAPIBody,
    };

    return (
        <FilterableRestroAPIBodyContext.Provider value={contextValue}>
            {props.children}
        </FilterableRestroAPIBodyContext.Provider>
    );
};

export default FilterableRestroAPIBodyContext