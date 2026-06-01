import type { Cinema } from "../../Types";
import locationIcon from "../../assets/icon-location.png";

interface CinemaCardProps {
    cinema: Cinema;
}

export default function CinemaCard({ cinema }: CinemaCardProps) {
    return (
        <div className="flex items-center gap-4 my-4">
            <div className={`w-12 h-12 flex items-center justify-center rounded-[4px] text-white font-bold text-lg ${cinema.logoColor}`}>
                {cinema.logo}
            </div>
            <div className="w-full">
                <div className="flex items-center gap-1 ">
                    <img src={locationIcon} alt="Location" className="w-4 h-4" />
                    <div className="text-sm text-gray-500">{cinema.distance} </div>
                </div>

                <div className="flex justify-between items-center ">
                    <div className="font-bold text-lg text-white">{cinema.name}  </div>
                    <div className="text-yellow-500 text-sm ">{cinema.rating} ⭐</div>
                </div>
                <div className="text-gray-500"> {cinema.status}</div>

            </div>
        </div>
    );
}