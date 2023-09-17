import { TypeRestroCard } from "../../../../constants"
import UserContext from "../../../../context/UserContext";
import { routePaths } from "../../../Ui";
import RestroCard from "../../RestroCard";
import { useContext } from 'react';


const Restros = (props: { restros: TypeRestroCard[] }) => {

  const { userInfo } = useContext(UserContext);

  return (
    props.restros.map((restro, index) => {
      const link = `${routePaths.restaurants}/${[restro.name, restro.locality, restro.areaName, userInfo.location.cityInfo.cityName, restro.id].map(value => value ? value.replace(/[^a-zA-Z0-9]/g, '-') : "").join("-").toLowerCase()}`;

      return (
        <RestroCard
          key={restro.id + restro.name + index}
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
    })
  )

}

export default Restros