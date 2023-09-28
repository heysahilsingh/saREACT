import CONSTANTS, { TypeMenuItem } from "../../../../constants"

interface TopPicksInterface {
    topPick: {
        bannerId: string,
        creativeId: string,
        description: string,
        title: string,
        dish: {
            info: TypeMenuItem
        }
    },
    className: string
}

const TopPicks = (props: TopPicksInterface) => {
    return (
        <div className={`${props.className && props.className} aspect-[0.9/1] relative`}>
            <div className="absolute bottom-0 left-0 w-full px-4 pb-4 flex justify-between">
                <span className="text-white grow">₹ {(props.topPick.dish.info.price / 100)}</span>
                <div className="w-fit">
                    <button className="text-green-700 bg-white leading-none py-2.5 px-8 relative uppercase rounded-md font-bold text-[15px]">
                        Add
                        <span className="absolute top-0.5 right-1">+</span>
                    </button>
                    {props.topPick.dish.info.addons && <p className="text-white text-xs text-right mt-2">Customisable</p>}
                </div>
            </div>
            <img src={CONSTANTS.IMG_CDN + props.topPick.creativeId} alt="" className="w-full h-auto aspect-[0.9/1] rounded-[6%] overflow-hidden bg-zinc-200 dark:bg-zinc-800"/>
        </div>
    )
}

export default TopPicks