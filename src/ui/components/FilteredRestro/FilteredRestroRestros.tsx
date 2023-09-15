import React, { useContext, useMemo } from "react";
import { TypeRestroCard } from "../../../constants";
import { routePaths } from "../../Ui";
import UserContext from "../../../context/UserContext";
import RestroCard from "../RestroCard";

interface FilteredRestroRestrosProps {
  restros: TypeRestroCard[] | undefined;
}

const FilteredRestroRestros = (props: FilteredRestroRestrosProps) => {
  const { userInfo } = useContext(UserContext);

  // Use useMemo to memoize the mapped RestroCard components
  const restroCards = useMemo(() => {
    if (!props.restros || props.restros.length === 0) {
      return null; // Return null when there are no restaurants
    }

    return props.restros.map((restro) => {
      const link = `${routePaths.restaurants}/${[restro.name, restro.locality, restro.areaName, userInfo.location.cityInfo.cityName, restro.id].map(value => value ? value.replace(/[^a-zA-Z0-9]/g, '-') : "").join("-").toLowerCase()}`;

      return (
        <RestroCard
          key={restro.id + restro.name + Math.random()}
          imageId={restro.cloudinaryImageId}
          offerHeader={restro.aggregatedDiscountInfoV3?.header || restro.aggregatedDiscountInfoV2?.header}
          offerSubHeader={restro.aggregatedDiscountInfoV3?.subHeader}
          name={restro.name}
          avgRating={restro.avgRating}
          cuisines={restro.cuisines}
          areaName={restro.areaName}
          link={link}
        />
      );
    });
  }, [props.restros, userInfo]);

  return <div>{restroCards}</div>;
};

export default FilteredRestroRestros;
