import React, { createContext, useContext, useState } from "react";

export type BookingInfo = {
    film: string;
    date: string;
    seats: number[];
    location: string;
    payment: number;
    order: string;
    time: string;
    movieId: string;
};

const BookingContext = createContext<{
    booking: BookingInfo | null;
    setBooking: React.Dispatch<React.SetStateAction<BookingInfo | null>>;
}>({
    booking: null,
    setBooking: () => { },
});

export const useBooking = () => useContext(BookingContext);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [booking, setBooking] = useState<BookingInfo | null>(null);

    return (
        <BookingContext.Provider value={{ booking, setBooking }}>
            {children}
        </BookingContext.Provider>
    );
};