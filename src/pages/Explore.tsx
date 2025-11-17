import { useState } from "react"
import BtnFlip from "../components/common/BtnFlip"
import { useLoaderData } from "react-router"
import { type Movie } from "../Types"
import MoviesTopSection from "../components/sections/MoviesTopSection"
import MoviesRecommendedSection from "../components/sections/MoviesRecommendedSection";
import MoviesUpcomingSection from "../components/sections/MoviesUpcomingSection"


// import { useAuth } from "../contexts/AuthContext" // when you have auth

export default function Explore() {
    // Get movie data from loader (fetched before component renders)
    const { topMovies, recommendedMovies, upcomingMovies } = useLoaderData() as {
         topMovies: Movie[],
          recommendedMovies: Movie[],
          upcomingMovies: Movie[]
    };

    // usestate for the btnflip to track which category button is active (nowShowing or upcoming)
    const [selectedMovieCategory, setSelectedMovieCategory] = useState<'nowShowing' | 'upcoming'>('nowShowing');

    return (
        <>

         <title>Min Biograf - Explore</title>
         
               {/* 🆕 Pass state DOWN to BtnFlip as props */}
            <BtnFlip 
                activeCategory={selectedMovieCategory}
                onCategoryChange={setSelectedMovieCategory}
            />
             {/* 🆕 Show different sections based on which button is active */}
            {selectedMovieCategory === 'nowShowing' ? (
                <MoviesTopSection movies={topMovies} />
            ) : (
               <MoviesUpcomingSection movies={upcomingMovies} variant="poster" />
            )}
            <MoviesRecommendedSection movies={recommendedMovies} />
        </>
    )
}

