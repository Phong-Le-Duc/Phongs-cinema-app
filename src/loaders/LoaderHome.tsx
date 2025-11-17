import { cinemas } from "../data/cinema_db";
import { type Movie } from "../Types";

export async function LoaderHome(): Promise<{ movies: Movie[]; cinemas: typeof cinemas }> {
    // Fetch upcoming movies
    const response = await fetch('https://api.themoviedb.org/3/movie/upcoming', {
        headers: {
            accept: "application/json",
            authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch upcoming movies");
    }
    const movieData = await response.json();

    // Return both movies and cinemas
    return {
        movies: movieData.results,
        cinemas
    };
}