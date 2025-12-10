import MoviesUpcomingSection from "../components/sections/MoviesUpcomingSection"
import { useLoaderData } from "react-router"
import { type Movie } from "../Types"
import { cinemas } from "../data/cinema_db";
import CinemaNearYouSection from "../components/sections/CinemaNearYouSection"
import SearchInput from "../components/common/SeachInput"

export default function Home() {
    const { movies } = useLoaderData() as { movies: Movie[] };

    return (
        <>
            <title>Min Biograf -Home</title>
            <SearchInput />
            <MoviesUpcomingSection movies={movies} variant="backdrop" />
            <CinemaNearYouSection cinemas={cinemas} />
        </>
    )
}

