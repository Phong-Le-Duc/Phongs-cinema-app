import { type Movie } from "../../Types"
import MovieCard from "../cards/MovieCard"


export default function MoviesRecommendedSection({ movies }: { movies: Movie[] }) {

    return (
         <section className="right-edge-sticky my-4">
            <h2 className="text-white font-bold mb-1">Recommended </h2>
            <div className="flex gap-4 overflow-x-scroll">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} variant="poster-small" />

                ))}
            </div>
        </section>
    )
}