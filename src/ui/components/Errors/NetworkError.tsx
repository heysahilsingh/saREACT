import errorImage from "../../..//assets/images/error.webp"


interface NetworkErrorProps {
    message?: string,
    buttonText?: string,
    onClick?: () => void
}

const NetworkError = (props: NetworkErrorProps) => {
    return (
        <div className="error text-center max-w-[300px] mx-auto">
            <img src={errorImage} alt={props?.message || "Error"} />
            <div className="mt-6 mb-8">
                <h1 className="font-bold text-lg">Uh-oh!</h1>
                <p className="text-zinc-500">{props.message || "Sorry! This should not have happened. Please retry"}</p>
            </div>
            <button onClick={props?.onClick || (() => window.location.reload())} className="text-primary border-2 border-primary py-2 px-4 hover:bg-primary hover:text-white">{props.buttonText || "Retry"}</button>
        </div>
    )
}

export default NetworkError