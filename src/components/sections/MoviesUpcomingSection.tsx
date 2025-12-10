import { type Movie } from "../../Types"
import MovieCard from "../cards/MovieCard"

// 🆕 Add variant prop
interface MoviesUpcomingSectionProps {
    movies: Movie[];
    variant?: "poster" | "backdrop" | "poster-small" | "poster-large";  // Optional, defaults to backdrop
}

export default function MoviesUpcomingSection({ movies }: MoviesUpcomingSectionProps) {

    return (
        <section className="right-edge-sticky my-4">
            <h2 className="text-white font-bold mb-1">Coming Soon</h2>
            <div className="flex gap-4 overflow-x-scroll">
                {movies.map(movie => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        variant="poster-large"
                        showRating={false}
                    />
                ))}
            </div>
        </section>
    )
}