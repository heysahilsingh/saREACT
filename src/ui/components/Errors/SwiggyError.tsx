import defaultImg from "../../../assets/images/swiggy-not-present.png"

interface SwiggyErrorProps {
    image?: string,
    heading: string,
    caption: string,
    showButton: boolean,
    buttonText: string,
    buttonOnClick: () => void
}

const SwiggyError = (props: SwiggyErrorProps) => {

    return (
        <div className="flex flex-col bg-[#ccdbea] items-center pb-[50px] border-t-[50px] border-white rounded-3xl">
            <img src={props.image ? props.image : defaultImg} alt={props.heading} />
            <div className="flex flex-col gap-1 text-center px-14 justify-center items-center">
                <h1 className="font-bold">{props.heading}</h1>
                <p className="text-[14px]">{props.caption}</p>
                {props.showButton && (
                    <button onClick={props.buttonOnClick} className="uppercase w-fit px-6 py-3 mt-6 text-white font-bold text-xs bg-[#6f889f]">{props.buttonText}</button>
                )}
            </div>
        </div>
    )
}

export default SwiggyError