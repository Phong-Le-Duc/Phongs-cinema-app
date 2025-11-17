import { useLoaderData } from "react-router";
import { type Movie } from "../Types";
import MovieDetailSection from "../components/sections/MovieDetailSection";

export default function Details() {
    // 🎯 Get both movieDetail and images from loader
    const { movieDetail, images } = useLoaderData() as { movieDetail: Movie; images: any };

    return (
        <>
            <title>Min Biograf - Details</title>

            <MovieDetailSection movieDetailData={movieDetail} movieImages={images} />
        </>
    );
}