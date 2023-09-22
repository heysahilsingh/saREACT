import { IconChevronDown, IconChevronUp } from "@tabler/icons-react"
import { TypeMenuItem } from "../../../../constants"
import MenuCard from "../../../components/MenuCard"

interface MenuCategoryProps {
    title: string,
    itemCards: {
        card: {
            info: TypeMenuItem,
            hideRestaurantDetails: boolean
        }
    }[]
}

const MenuCategory = (props: MenuCategoryProps) => {
    return (
        <div className="menu-category flex flex-col border-t-[10px] border-[#f1f1f6] dark:border-zinc-900 px-4 py-6">
            <div className="header flex gap-2 items-center justify-between">
                <p className="text-lg font-semibold leading-[120%]">{props.title} ({props.itemCards.length})</p>
                <div className="">
                    <IconChevronUp stroke={1} size={26} />
                    <IconChevronDown stroke={1} size={26} />
                </div>
            </div>
            <div className="menues">
                {props.itemCards.map(item => <MenuCard key={item.card.info.id} menu={item.card.info}/>)}
            </div>
        </div>
    )
}

export default MenuCategory