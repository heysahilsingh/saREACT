import { Link } from "react-router-dom";

interface InfoCardProps {
    text?: string;
    href?: string;
    width?: string;
    children?: React.ReactNode;
    className?: string;
}

const InfoCard = (props: InfoCardProps) => {
    return (
        <Link to={props.href || ''} style={{ width: props.width }} className={props.className + " max-w-full border border-zinc-200 rounded-lg px-6 py-3 dark:text-zinc-400 dark:border-zinc-800 cursor-pointer flex items-center justify-center"}>
            <p className="overflow-hidden whitespace-nowrap text-ellipsis text-center">{props.text}</p>
            {props?.children &&
                <div className="flex items-center justify-center">
                    {props.children}
                </div>
            }
        </Link>
    )
}

export default InfoCard