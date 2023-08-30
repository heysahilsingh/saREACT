import { IconChevronDown } from "@tabler/icons-react";
import InfoCard from "./InfoCard";
import { useState } from 'react';

interface InfoCardSectionProps {
    title: string;
    cardArray: string[]
}

const InfoCardSection = (props: InfoCardSectionProps) => {
    const [visibleCards, setVisibleCards] = useState(5);

    return (
        <div className="w-full flex flex-col">
            <p className="font-bold text-2xl mb-6 text-zinc-800 dark:text-zinc-400">{props.title} Near Me</p>
            <div className="grid gap-3 grid-cols-2 lg:gap-x-10 lg:gap-y-4 lg:grid-cols-4">
                {props.cardArray.slice(0, visibleCards).map(card => {
                    const link = card.toLowerCase().replace(/[\s-]+/g, '-');
                    return (
                        <InfoCard key={card} text={card} href={"/near/" + link} />
                    )
                })}
                {(props.cardArray.length > 5 && visibleCards < props.cardArray.length) &&
                    <InfoCard>
                        <div className="flex items-center gap-1 font-medium" onClick={() => setVisibleCards(props.cardArray.length)}>
                            Show more
                            <IconChevronDown />
                        </div>
                    </InfoCard>
                }
            </div>
        </div>
    );
}

export default InfoCardSection