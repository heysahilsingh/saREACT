import { IconCoinRupee, IconDiscount2 } from "@tabler/icons-react"
import { TypeRestaurantInformation } from "../../../../constants"

interface OffersProps {
    offers: {
        couponCode: string,
        header: string,
        description: string,
        offerLogo: string,
        offerTag: string,
        offerTagColor: string,
        offerType: string,
        restId: string
    }[],
    restroInfo: {
        info: TypeRestaurantInformation,
        legalInfo: {
            imageId: string,
            type: string,
            text: string[]
        },
    }
}

const Offers = (props: OffersProps) => {
    return (
        <div>
            <div className="r-d-time-c-t">
                <ul className="flex items-center gap-6">
                    <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-400">
                        <svg className="RestaurantTimeCost_icon__8UdT4" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" fill="none">
                            <circle r="8.35" transform="matrix(-1 0 0 1 9 9)" stroke="currentColor" strokeWidth="1.3"></circle>
                            <path d="M3 15.2569C4.58666 16.9484 6.81075 18 9.273 18C14.0928 18 18 13.9706 18 9C18 4.02944 14.0928 0 9.273 0C9.273 2.25 9.273 9 9.273 9C6.36399 12 5.63674 12.75 3 15.2569Z" fill="currentColor"></path>
                        </svg>
                        <p className="font-bold">{props.restroInfo.info.sla.deliveryTime} MIN</p>
                    </li>
                    <li className="flex items-center gap-2 text-zinc-700 dark:text-zinc-400">
                        <IconCoinRupee />
                        <p className="font-bold">{props.restroInfo.info.costForTwoMessage}</p>
                    </li>
                </ul>
            </div>
            {(props.offers || []).length > 0 && (props.offers?.some(offer => offer.couponCode)) && (
                <ul className="flex gap-3 mt-4 no-scrollbar overflow-x-scroll overflow-y-hidden text-[14px]">
                    {props.offers?.map(offer => {
                        return (
                            <li key={offer.restId + offer.header + offer.description} className="relative min-w-fit flex items-center py-2.5 px-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 uppercase">
                                {offer.offerTag && (
                                    <div className="flex flex-col gap-1 items-center justify-center h-fit -rotate-90 -ml-[19px]">
                                        <span className="font-bold text-[10px] text-primary">{offer.offerTag}</span>
                                        <hr className="w-full bg-zinc-200 dark:bg-zinc-800 h-[1px] border-0" />
                                    </div>
                                )}
                                <div className="grow flex flex-col">
                                    <div className="head flex items-center gap-1.5">
                                        <IconDiscount2 size={20} stroke={3} className="text-[#8B554E]" />
                                        <p className="font-bold">{offer.header}</p>
                                    </div>
                                    <p className="text-zinc-900 dark:text-zinc-400">{offer.couponCode} | {offer.description}</p>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default Offers