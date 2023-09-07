import { useState, useCallback, ReactNode } from "react";
import { IconX } from '@tabler/icons-react';

interface FiltersButtonProps {
    children: ReactNode,
    disableClick?: boolean,
    className?: string,
    onSelect?: () => void,
    onDeSelect?: () => void,
}

const FiltersButton = (props: FiltersButtonProps) => {

    const [selected, setSelected] = useState<boolean>(false);

    const onSelect = useCallback(() => {
        if (!props.disableClick) {
            const newSelected = !selected;
            setSelected(newSelected);

            if (newSelected && props.onSelect) {
                props.onSelect();
            } else if (!newSelected && props.onDeSelect) {
                props.onDeSelect();
            }
        }
    }, [selected]);

    return (
        <button onClick={onSelect} className={`min-w-fit flex items-center gap-2 py-2.5 px-3.5 text-[15px] leading-none border-2 rounded-full overflow-hidden ${(selected ? "border-zinc-400 bg-zinc-200 dark:bg-zinc-800 dark:border-zinc-600" : "border-zinc-200 bg-transparent dark:border-zinc-800")} ${props?.className}`}>
            {props.children}
            {selected && <IconX className="text-zinc-700 dark:text-zinc-400" size={16} />}
        </button>
    )
}

export default FiltersButton


