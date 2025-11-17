import type { Cinema } from "../../Types";
import CinemaCard from "../cards/CinemaCard";

interface CinemasSectionProps {
    cinemas: Cinema[];
}

export default function CinemaNearYouSection({ cinemas }: CinemasSectionProps) {
    return (
        <section className="my-4 ">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-white font-bold ">Cinemas near you</h2>
                <p className="text-gray-500">See more</p>
            </div>
            <div className="max-h-80 overflow-y-auto gap-4 hide-scrollbar">
                {cinemas.map(cinema => (
                    <CinemaCard key={cinema.id} cinema={cinema} />
                ))}
            </div>
        </section>
    );
}