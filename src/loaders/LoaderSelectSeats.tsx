import { cinemas } from "../data/cinema_db";
import type { LoaderFunctionArgs } from "react-router";

// TMDB fetch function
export async function getMovieById(id: string) {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        {
            headers: {
                accept: "application/json",
                authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
        }
    );
    if (!response.ok) throw new Error("Movie not found");
    return await response.json();
}

export async function LoaderSelectSeats({ params }: LoaderFunctionArgs) {
    const cinemasList = cinemas;
    const movie = await getMovieById(params.movieId as string); // movieId from route params
    return { cinemas: cinemasList, movie };
}