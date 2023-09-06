
interface FiltersButtonProps {
    text: string,
    icon?: JSX.Element,
    onClick?: () => void
}

const FiltersButton = (props: FiltersButtonProps) => {
    return (
        <button onClick={props.onClick && props.onClick} className="min-w-fit flex items-center gap-2 py-2.5 px-3.5 text-[15px] leading-none border-2 dark:border-zinc-800 rounded-full">
            <span>{props.text}</span>
            {props.icon && props.icon}
        </button>
    )
}

export default FiltersButton