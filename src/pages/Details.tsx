import { useEffect } from "react";
import { useLoaderData } from "react-router";
import { type Movie } from "../Types";
import MovieDetailSection from "../components/sections/MovieDetailSection";
import { useMovie } from "../context/MovieContext";

export default function Details() {
    const { movieDetail, images } = useLoaderData() as { movieDetail: Movie; images: any };
    const { setMovie } = useMovie();

    useEffect(() => {
        setMovie({
            id: movieDetail.id.toString(),
            title: movieDetail.title,
            poster_path: movieDetail.poster_path ?? undefined,
        });
    }, [movieDetail, setMovie]);

    return (
        <>
            <title>Min Biograf - Details</title>
            <MovieDetailSection movieDetailData={movieDetail} movieImages={images} />
        </>
    );
}