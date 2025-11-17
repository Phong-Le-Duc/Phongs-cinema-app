import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";

type House = {
    adress1: string;
    id: string; // <-- Add id for navigation
    city?: string;
    type?: string;
};

export default function SearchInputSimple() {
    const { allHouses: houses } = useLoaderData() as { allHouses: House[] };
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState<House[]>([]); // <-- Store House objects

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setInput(value);

        // --- Suggest full house objects, not just address strings ---
        if (value.length > 0 && houses.length > 0) {
            setSuggestions(
                houses.filter(house =>
                    house.adress1.toLowerCase().includes(value.toLowerCase())
                )
            );
        } else {
            setSuggestions([]);
        }
    }

    // --- Clicking a suggestion fills input and navigates to detail page ---
    function handleSelectSuggestion(house: House) {
        setInput(house.adress1);
        setSuggestions([]);
        navigate(`/detail-homes/${house.id}`);
    }

    // --- On submit, go to first suggestion's detail page if exists ---
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (suggestions.length > 0) {
            navigate(`/detail-homes/${suggestions[0].id}`);
        } else {
            navigate(`/list-homes?search=${encodeURIComponent(input)}`);
        }
    }

    return (
        <div className="bg-dinmaegler-blue-light p-5 min-w-[300px] max-w-[600px] w-full mb-4">
            <p className="font-bold">Search Property</p>
         
            <form onSubmit={handleSubmit} className="flex gap-2 ">
                <div className="w-full relative">
                    <input
                        type="search"
                        name="search"
                        value={input}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Søg på fx. glaskeramisk komfur, bryggers, kælder eller lignende"
                        className="p-2 rounded border border-gray-300 min-w-[300px] max-w-[600px] w-full bg-white"
                    />
                    {suggestions.length > 0 && (
                        <ul className="absolute left-0 right-0 bg-white border mt-1 rounded shadow z-10">
                            {suggestions.map((house) => (
                                <li
                                    key={house.id}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSelectSuggestion(house)}
                                >
                                    {house.adress1}
                                    {house.city && (
                                        <span className="ml-2 text-xs text-gray-500">{house.city}</span>
                                    )}
                                    {house.type && (
                                        <span className="ml-2 text-xs text-gray-400">{house.type}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button className="bg-dinmaegler-blue text-white p-2 rounded" type="submit">
                    Søg
                </button>
            </form>
        </div>
    );
}
// --- Tweaks: suggestions now use House objects, click navigates to detail, submit goes to first suggestion