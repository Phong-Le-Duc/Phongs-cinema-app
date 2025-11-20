

import type { ReactNode } from "react";



export type Movie = {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    overview: string;
    release_date: string;
    vote_average: number;
    // director?: string;
    genres?: { id: number; name: string }[];
    runtime?: number;
}


export type MovieCardProps = {
    movie: Movie;
    variant?: "poster" | "backdrop" | "poster-small";  // Added poster-small
    showRating?: boolean;
}


export type Cinema = {
    id: number;
    name: string;
    status: string;
    address: string;
    rating: number;
    distance: string;
    logo: string;
    logoColor: string;
    // logo: string;
};



// typescript interface block for btnflip.tsx
export interface BtnFlipProps {
    activeCategory: 'nowShowing' | 'upcoming';
    onCategoryChange: (category: 'nowShowing' | 'upcoming') => void;
}




export type SingleSeatProps = {
    SeatNumber: number;
    handleSelect: (seatNumber: number) => void;
    children: ReactNode;
    id?: string;
};


export type PaymentFormProps = {
    selectedSeats: number[];
};

export type PaymentFormState = {
    email: string;
    cardholder: string;
    cardnumber: string;
    expMonth: string;
    expYear: string;
    cvc: string;
};