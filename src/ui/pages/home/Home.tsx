import { useContext, useEffect, useState } from "react";
import CONSTANTS from "../../../constants";
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import TopHeader from "../../components/TopHeader"
import Page from "../Page";
import UserContext from "../../../context/UserContext";
import RestroInstaWidget from "./RestroInstaWidget";

const Home = () => {
    const device = useDeviceDetect();

    const { userInfo } = useContext(UserContext);

    // Error Message
    const [showError, setShowError] = useState<boolean>(false)

    const [pageData, setPageData] = useState<object[]>([]);

    // API Call
    useEffect(() => {

        async function fetchData() {
            try {

                const response = await fetch(CONSTANTS.API_PAGE_HOME.mob + "lat=" + userInfo?.location?.cityInfo?.latitude + "&lng=" + userInfo?.location?.cityInfo?.longitude);
                const responseData = await response.json();

                // console.log(responseData?.data?.success?.cards);

                // console.log(responseData?.data?.success?.cards[0]?.gridWidget?.gridElements?.infoWithStyle?.info);


                setPageData(responseData?.data?.success?.cards)

                // console.log(pageData);

            } catch (error) {
                setShowError(true);
            }
        }

        fetchData();
    }, []);

    return (
        <Page pageName="home">
            {/* Sticky Header */}
            {!device?.isDesk && <TopHeader className="sticky top-0" />}

            {/* Error message */}
            {showError && <div>Error while loading data</div>}

            {/* Data */}
            {!showError && (
                <div className="flex flex-col px-4">
                    {/* Restaurants and Instamart Banner */}
                    <div className="flex items-center justify-between gap-4">
                        {true && (
                            pageData?.at(0)?.gridWidget?.gridElements?.infoWithStyle?.info.map((card, index) => {
                                return (
                                    <RestroInstaWidget key={card.id} type={card?.accessibility?.altText} imgId={index} imgAlt={card?.accessibility?.altTextCta} />
                                )
                            })
                        )}
                    </div>
                </div>
            )}
        </Page>
    )
}

export default Home