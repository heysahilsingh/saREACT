import { IconArrowNarrowRight } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { routePaths } from '../../Ui';

interface RestroInstaWidgetProps {
    type: "RESTAURANT" | "INSTAMART",
    imgId: number,
    imgAlt?: string,
}

const RestroInstaWidget = (props: RestroInstaWidgetProps) => {
    return (
        <Link to={props.type === "INSTAMART" ? routePaths.Instamart : routePaths.restaurants} className='grow'>
            <div className="relative overflow-hidden flex flex-col px-3 py-4 pr-10 border border-zinc-300 rounded-[20px] dark:text-zinc-400 dark:border-zinc-600">
                <p className="font-bold text-xl text-zinc-800 dark:text-zinc-200">{props.type === "INSTAMART" ? "Instamart" : "Restaurant"}</p>
                <span className="mt-1 mb-2 text-[14px]">{props.type === "INSTAMART" ? "Groceries in under 30 min" : "Enjoy your favorite treats"}</span>
                <IconArrowNarrowRight className="" size={30} stroke={1} />
                <img className="absolute right-0 -bottom-1 h-[80%] object-cover" src={`../.././assets/images/home-restro-insta-widget-${props.imgId}.png`} alt={props?.imgAlt} />
            </div>
        </Link>
    )
}

export default RestroInstaWidget