import { Api_Card } from "./Restaurants"

interface FiltersProps {
    data: { facetList: Api_Card[], sortConfigs: Api_Card[] } | null,
    onApply: () => void,
}

const Filters = (props: FiltersProps) => {
    console.log(props.data);
    return (
        <div className="sa">sasasas</div>
    )
}

export default Filters