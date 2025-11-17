import type { LoaderFunctionArgs } from "react-router";
import type { Movie } from "../Types";

// this loader fetches details from a movie from TMDB API
export async function LoaderDetails({ params }: LoaderFunctionArgs): Promise<{ movieDetail: Movie; images: any }> {
    // Fetch both movie details and images in parallel
    const [movieResponse, imagesResponse] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${params.id}`, {
            headers: {
                accept: "application/json",
                authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            }
        }),
        fetch(`https://api.themoviedb.org/3/movie/${params.id}/images`, {
            headers: {
                accept: "application/json",
                authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            }
        })
    ]);

    if (!movieResponse.ok) {
        const errorData = await movieResponse.json();
        console.error("API Error:", errorData);
        throw new Error(`Failed to fetch movie details: ${movieResponse.status}`);
    }

    if (!imagesResponse.ok) {
        const errorData = await imagesResponse.json();
        console.error("Images API Error:", errorData);
        throw new Error(`Failed to fetch images: ${imagesResponse.status}`);
    }

    const apiMovieResponseData = await movieResponse.json();
    const apiMovieImagesResponseData = await imagesResponse.json();

    console.log("✅ Movie Detail Loaded:", apiMovieResponseData);
    console.log("✅ Images Loaded:", apiMovieImagesResponseData);

    return { movieDetail: apiMovieResponseData, images: apiMovieImagesResponseData };
}