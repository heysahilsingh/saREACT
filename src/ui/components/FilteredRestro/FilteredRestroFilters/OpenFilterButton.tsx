import { useState, useEffect, useCallback, ReactNode } from "react";
import { IconX } from '@tabler/icons-react';

interface OpenFiltersButtonProps {
    children: ReactNode,
    isSelectable: boolean,
    isPreSelected: boolean,
    onSelect?: () => void,
    onDeSelect?: () => void,
    onClick?: () => void,
    className?: string | undefined,
}

const OpenFiltersButton = (props: OpenFiltersButtonProps) => {

    const [selected, setSelected] = useState<boolean>(false);

    useEffect(() => setSelected(props.isPreSelected), [props.isPreSelected])

    const onSelect = useCallback(() => {
        if (props.isSelectable) {
            const newSelected = !selected;
            setSelected(newSelected);

            if (newSelected && props.onSelect) {
                props.onSelect();
            } else if (!newSelected && props.onDeSelect) {
                props.onDeSelect();
            }
        } else {
            props.onClick && props.onClick()
        }

    }, [selected]);

    return (
        <button onClick={onSelect} className={`min-w-fit flex items-center gap-2 py-2.5 px-3.5 text-[15px] leading-none border-2 rounded-full ${(selected && props.isSelectable ? "border-zinc-400 bg-zinc-200 dark:bg-zinc-800 dark:border-zinc-600" : "border-zinc-200 bg-transparent dark:border-zinc-800")} ${props.className ? props.className : ""}`}>
            {props.children}
            {selected && props.isSelectable && <IconX className="text-zinc-700 dark:text-zinc-400" size={16} />}
        </button>
    )
}

export default OpenFiltersButton


