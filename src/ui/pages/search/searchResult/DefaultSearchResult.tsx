import { Link } from "react-router-dom";
import CONSTANTS from "../../../../constants";
import { routePaths } from "../../../Ui";

export type DefaultSearchResultType = {
    category: string,
    cloudinaryId: string,
    highlightedText: string,
    metadata: string,
    subCategory: string,
    tagToDisplay: "Instamart" | "DIsh" | "Restaurant",
    text: string,
    type: string
}

interface DefaultSearchResultProps {
    results: DefaultSearchResultType[] | undefined
}

const DefaultSearchResult = (props: DefaultSearchResultProps) => {

    // Bold HighlightedText
    const boldHighlightedText = (text: string) => {
        const parts = text.split(/\{\{(.*?)\}\}/);

        return (
            <p>
                {parts.map((part, index) =>
                    index % 2 === 1 ? (
                        <span key={index} className='font-bold'>{part}</span>
                    ) : (
                        <span key={index}>{part}</span>
                    )
                )}
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {props.results && props.results.map(result => {
                // const link = `${routePaths.search}?query=${result.text.split(' ').join('+')}`;

                const link = `${routePaths.search}?query=${encodeURIComponent(result.text).replace(/%20/g, '+')}`;

                return (
                    <div className="min-w-fit" key={result.metadata + result.text}>
                        <Link to={link} className='flex gap-4 items-center'>
                            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden min-w-[64px] max-w-[64px] w-[64px] aspect-square">
                                <img className='object-cover w-full h-full bg-zinc-100 dark:bg-zinc-900' src={CONSTANTS.IMG_CDN + result.cloudinaryId} alt={result.category} />
                            </div>
                            <div className="flex flex-col gap-1 grow leading-none">
                                <div className='text-[15px] leading-[120%]'>{boldHighlightedText(result.highlightedText)}</div>
                                <p className={`text-[14px] ${result.tagToDisplay === "Instamart" ? "text-[#982160]" : ""}`}>{result.tagToDisplay}</p>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default DefaultSearchResult