import { useState } from "react";

import type { SingleSeatProps } from "../../Types";



export default function SingleSeat({ SeatNumber, handleSelect, children, id }: SingleSeatProps) {
    const [isSelected, setIsSelected] = useState(false);

    function handleClick() {
        console.log(`Seat ${SeatNumber} clicked`);
        setIsSelected(!isSelected);
        handleSelect(SeatNumber);
    }

    return (
        <button
            className={`w-7 h-7 text-xs rounded-lg ${isSelected ? "bg-red-500" : "bg-blue-500"}`}
            onClick={handleClick}
            id={id}
        >
            {children}
        </button>
    );
}