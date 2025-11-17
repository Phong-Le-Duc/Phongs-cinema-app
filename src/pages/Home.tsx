import NotLoggedInHeader from "../components/ui/header/NotLoggedInHeader"
import LoggedInHeader from "../components/ui/header/LoggedInHeader"
import MoviesUpcomingSection from "../components/sections/MoviesUpcomingSection"
import { useLoaderData } from "react-router"
import { type Movie } from "../Types"
import { cinemas } from "../data/cinema_db";
import CinemaNearYouSection from "../components/sections/CinemaNearYouSection"
import SearchInput from "../components/common/SeachInput"
// import { useAuth } from "../contexts/AuthContext" // when you have auth




export default function Home() {
    // const { isLoggedIn } = useAuth(); // Replace with your actual auth check
    const isLoggedIn = false; // Temporary - replace with real auth
    const { movies } = useLoaderData() as { movies: Movie[] };

    return (
        <>
            <title>Min Biograf -Home</title>
            {/* Conditional header based on login status */}
            {isLoggedIn ? <LoggedInHeader /> : <NotLoggedInHeader />}

            <SearchInput />
            <MoviesUpcomingSection movies={movies} variant="backdrop" />
            <CinemaNearYouSection cinemas={cinemas} />
        </>
    )
}

