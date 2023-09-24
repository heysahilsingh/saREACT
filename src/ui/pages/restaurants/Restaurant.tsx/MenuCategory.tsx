import { IconChevronDown, IconChevronUp } from "@tabler/icons-react"
import { TypeMenuItem } from "../../../../constants"
import MenuItemCard from "../../../components/MenuItemCard"
import { useState } from "react"

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

    const [isMenuesVisible, setIsMenuesVisible] = useState<boolean>(true);
    const [visibleItems, setVisibleItems] = useState<number>(10);

    return (
        <div className="menu-category flex flex-col border-t-[10px] border-[#f1f1f6] dark:border-zinc-900">
            <div onClick={() => setIsMenuesVisible(prev => !prev)} className="header flex gap-2 items-center justify-between bg-white dark:bg-neutral-950 p-4 sticky top-[51px] z-[2]">
                <p className="text-lg text-[#3e4152] dark:text-slate-400 font-semibold leading-[120%]">{props.title} ({props.itemCards.length})</p>
                <div className="">
                    {isMenuesVisible && <IconChevronUp stroke={1} size={26} />}
                    {!isMenuesVisible && <IconChevronDown stroke={1} size={26} />}
                </div>
            </div>
            {isMenuesVisible && (
                <div className="menues flex flex-col gap-6 px-4 pb-5">
                    {props.itemCards.slice(0, visibleItems).map(item => (
                        <div key={item.card.info.id} className="menu">
                            <hr className="border-zinc-200 dark:border-zinc-800 mb-6" />
                            <MenuItemCard menu={item.card.info} />
                        </div>
                    ))}
                    {(props.itemCards.length > 10 && visibleItems < props.itemCards.length) && (
                        <button onClick={() => setVisibleItems(props.itemCards.length)} className="hover:text-white hover:bg-primary border-2 rounded border-primary text-primary py-2.5 px-8 font-bold w-full">View All</button>
                    )}
                </div>
            )}
        </div>
    )
}

export default MenuCategory

// (props.cardArray.length > 5 && visibleCards < props.cardArray.length)