import { TypeRestaurantInformation } from "../../../../constants"
import RestroCardVerticle from "../../RestroCardVertical";

const Restros = (props: { restros: TypeRestaurantInformation[] }) => {
  return (
    props.restros.map((restro, index) => <RestroCardVerticle key={restro.id + restro.name + index} restro={restro} />)
  )

}

export default Restros