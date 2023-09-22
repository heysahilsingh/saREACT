import { TypeMenuItem } from "../../constants"

interface MenuCardProps {
    menu: TypeMenuItem
}

const MenuCard = (props: MenuCardProps) => {
    return (
        <div className="border-t border-zinc-200 dark:border-zinc-800 py-4 bg-red-200">Menu Card: {props.menu.name}</div>
    )
}

export default MenuCard