import { Link } from "react-router-dom";
import CONSTANTS from "../../../constants";
import { routePaths } from "../../Ui";

export type SearchResultsType = {
    category: string,
    cloudinaryId: string,
    highlightedText: string,
    metadata: string,
    subCategory: string,
    tagToDisplay: "Instamart" | "DIsh" | "Restaurant",
    text: string,
    type: string
}

interface SearchResultsProps {
    results: SearchResultsType[] | undefined
}

const SearchResults = (props: SearchResultsProps) => {

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
        <div className="flex flex-col gap-6 px-4 py-6">
            {!props.results && [1, 2, 3, 4, 5].map(number => (
                <div className="w-fit flex gap-4 items-center" key={number}>
                        <div className="shimmer-bg border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden min-w-[64px] aspect-square"></div>
                        <div className="flex flex-col gap-2 min-w-[50%] grow">
                            <div className="shimmer-bg w-[200px] h-[12px] rounded-md"></div>
                            <div className="shimmer-bg w-[100px] h-[10px] rounded-md"></div>
                        </div>
                </div>
            ))}

            {props.results && props.results.map(result => {
                const link = `${routePaths.search}?query=${result.text.split(' ').join('+')}`;

                return (
                    <div className="min-w-fit" key={result.metadata + result.text}>
                        <Link to={link} className='flex gap-4 items-center'>
                            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden w-[64px] aspect-square">
                                <img className='object-cover w-full h-full bg-zinc-100 dark:bg-zinc-900' src={CONSTANTS.IMG_CDN + result.cloudinaryId} alt={result.category} />
                            </div>
                            <div className="flex flex-col gap-1 grow leading-none">
                                <div className='text-[15px]'>{boldHighlightedText(result.highlightedText)}</div>
                                <p className={`text-[14px] ${result.tagToDisplay === "Instamart" ? "text-[#982160]" : ""}`}>{result.tagToDisplay}</p>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default SearchResults