import { useLoaderData } from "react-router";
import type { Cinema } from "../Types";

export default function SelectSeats() {
    const { cinemas } = useLoaderData() as { cinemas: Cinema[] };

    return (
        <>
            <title>Min Biograf - Select Seats</title>
            <div className="h-80 flex flex-col items-center justify-center ">
                <label htmlFor="cinema-select" className="mb-2 font-bold text-white w-full">Cinema</label>
                <select id="cinema-select" className="p-2 rounded border mb-4 bg-gray-800 text-white w-full ">
                    <option value="" >Choose a cinema</option>
                    {cinemas.map(cinema => (
                        <option key={cinema.id} value={cinema.id} className="">
                            {cinema.name}
                        </option>

                    ))}
                </select>

                <div className="flex">
                    <div>
                        <p>Date</p>
                        <select name="" id=""></select>
                    </div>
                    <div>
                        <p>Time</p>
                        <select name="" id=""></select>
                    </div>
                </div>
            </div>
        </>
    );
}