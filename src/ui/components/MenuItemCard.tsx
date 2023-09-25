import { useEffect, useRef, useState } from "react";
import CONSTANTS, { TypeMenuItem } from "../../constants"
import { IconStarFilled } from "@tabler/icons-react";

interface MenuItemCardProps {
    menu: TypeMenuItem
}

const MenuItemCard = (props: MenuItemCardProps) => {
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const descriptionRef = useRef<HTMLDivElement | null>(null);

    // Item Description Line count
    useEffect(() => {
        const descriptionElement = descriptionRef.current;
        if (descriptionElement) {
            const lineHeight = parseFloat(getComputedStyle(descriptionElement).lineHeight);
            const maxHeight = lineHeight * 2;
            const actualHeight = descriptionElement.clientHeight;
            setIsOverflowing(actualHeight > maxHeight);
        }
    }, [props.menu.description]);

    return (
        <div className="menu-item leading-[120%]">
            <div className="flex gap-6">
                <div className="col1 w-2/4 grow">
                    <div className="item-ribbons">
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`veg-classifier border ${props.menu.itemAttribute.vegClassifier === "VEG" ? "text-[#0f8a65] border-[#0f8a65]" : "text-[#e43b4f] border-[#e43b4f]"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 518.16 518.16" fill="currentColor" width="10" height="10">
                                    <path d="M498.16 0H20A20 20 0 0 0 0 20v478.16a20 20 0 0 0 20 20h478.16a20 20 0 0 0 20-20V20a20 20 0 0 0-20-20zm-4 484.16a10 10 0 0 1-10 10H34a10 10 0 0 1-10-10V34a10 10 0 0 1 10-10h450.16a10 10 0 0 1 10 10z" fill="currentColor" />
                                    <circle cx="258.39" cy="258.29" r="180.79" fill="currentColor" />
                                </svg>
                            </div>
                            {props.menu.ribbon.text && (
                                <div className="flex items-center gap-1 leading-none text-[12px] font-bold text-[#ee9c00]">
                                    <IconStarFilled size={12} />
                                    <span>{props.menu.ribbon.text}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="item-name">
                        <p className="font-semibold text-[#3e4152] dark:text-slate-400">{props.menu.name}</p>
                    </div>
                    <div className="item-pricing">
                        <div className="flex items-center gap-2 mt-1.5 mb-3">
                            <p className="price text-[15px] h-fit min-w-fit">₹ {(props.menu.price || props.menu.defaultPrice) / 100}</p>
                            {(props.menu.offerTags || []).length > 0 && (
                                <div className="flex items-center gap-2 text-[10px] uppercase no-scrollbar overflow-scroll grow">
                                    {props.menu.offerTags.map((offerTag, index) => (
                                        <div key={offerTag.title + index} className="offer min-w-fit bg-[#fae8e3] dark:bg-zinc-800 border-l-2 border-[#db6742] text-[#db6742] py-1 px-1.5 leading-none">
                                            <span className="font-bold">{offerTag.title}</span> | {offerTag.subTitle}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="item-description">
                        <p
                            ref={descriptionRef}
                            className={`text-[14px] text-slate-400 dark:text-slate-600 ${showFullDesc || !isOverflowing ? '' : 'line-clamp-2'}`}
                        >
                            {props.menu.description}
                        </p>
                        {isOverflowing && !showFullDesc && (
                            <button
                                onClick={() => setShowFullDesc(true)}
                                className="text-xs text-slate-400 dark:text-slate-600 font-bold"
                            >
                                More
                            </button>
                        )}
                    </div>
                </div>
                <div className="col2 max-w-[120px] min-w-[120px]">
                    <div className="relative w-full flex flex-col items-center justify-center">
                        <div className="item-img min-w-full rounded-[8px] overflow-hidden aspect-[1.25/1] bg-zinc-200 dark:bg-zinc-800">
                            {props.menu.imageId && (
                                <img
                                    className={`object-cover object-center h-full w-full ${props.menu?.nextAvailableAtMessage ? "saturate-0" : ""}`}
                                    src={CONSTANTS.IMG_CDN + props.menu.imageId}
                                    alt={props.menu.name}
                                />
                            )}
                        </div>
                        <div className="item-action">
                            <button className="-mt-[23px] w-[99px] h-[37px] text-green-700 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-green-700 leading-none p-2.5 uppercase rounded-md font-bold text-[15px] shadow-xl relative">
                                {!props.menu?.nextAvailableAtMessage && (
                                    <>
                                        <span>Add</span>
                                        {props.menu.addons && <span className="absolute top-0.5 right-1">+</span>}
                                    </>
                                )}

                                {props.menu?.nextAvailableAtMessage && <span className="block text-[8px] leading-[120%] capitalize font-normal text-gray-800">{props.menu.nextAvailableAtMessage}</span>}
                            </button>

                            {props.menu.addons && !props.menu?.nextAvailableAtMessage && (
                                <p className="text-xs text-center opacity-90 mt-1">Customizable</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuItemCard;