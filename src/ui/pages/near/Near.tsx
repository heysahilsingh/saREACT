import Page from '../Page';
import useDeviceDetect from '../../../hooks/useDeviceDetect';
import TopHeader from '../../components/TopHeader';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import UserContext from '../../../context/UserContext';
import CONSTANTS from '../../../constants';
import NetworkError from "../../components/Errors/NetworkError";
import FilterableRestro from '../../components/FilterableRestro/FilterableRestro';
import { RestroCardVerticleShimmer } from '../../components/RestroCardVertical';


const Near = () => {
    const device = useDeviceDetect();
    const { userInfo } = useContext(UserContext);

    const [restros, setRestros] = useState(undefined);
    const [filters, setFilters] = useState(undefined);

    const [showError, setShowError] = useState<boolean>(false)
    const [showShimmer, setShowShimmer] = useState<boolean>(true);

    useEffect(() => {
        const userLat = userInfo.location.cityInfo.latitude;
        const userLng = userInfo.location.cityInfo.longitude;

        if (userLat && userLng) {
            const fetchData = async () => {
                try {
                    if (showError) setShowError(false)
                    if (!showShimmer) setShowShimmer(true)

                    const URL = CONSTANTS.API_PAGE_RESTRO_NEAR.getUrl(userLat, userLng);
                    const response = await fetch(URL);
                    const responseData = await response.json();

                    if (responseData?.data?.success?.cards) {
                        const data = responseData?.data?.success?.cards?.map((card: { card: { card: [] } }) => card?.card?.card);

                        const responseRestros = data.find((d: { id: string }) => d.id === "restaurant_grid_listing")?.gridElements?.infoWithStyle?.restaurants;
                        const responseFilters = data.find((d: { facetList: object, id: string }) => d.facetList);

                        if (responseFilters) setFilters(responseFilters)
                        if (responseRestros) setRestros(responseRestros)

                        if (showShimmer) setShowShimmer(false)
                    }
                    else {
                        throw new Error(responseData?.data?.statusMessage);
                    }
                } catch (error) {
                    setShowError(true);
                }
            }

            fetchData();
        }
    }, [userInfo, device])

    return (
        <Page pageName='near-me'>
            {/* Sticky Header */}
            {!device.isDesk && <TopHeader className="sticky top-0" />}

            {/* Error */}
            {showError && <NetworkError />}

            {/* Shimmer */}
            {showShimmer && (
                <div className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 lg:gap-8 pt-3 lg:pt-5 no-scrollbar overflow-x-scroll overflow-y-hidden">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(() => <RestroCardVerticleShimmer key={Math.random()} />)}
                </div>
            )}

            {/* Filterable Restros */}
            {(filters && restros && !showShimmer) && (
                <div className="px-4">
                    <FilterableRestro
                        filters={filters}
                        restros={restros}
                        restrosListLoadType="ON_CLICK"
                        filtersClasses="filters sticky lg:top-0 top-[64px]"
                    />
                </div>
            )}
        </Page>
    )
}

export default Near