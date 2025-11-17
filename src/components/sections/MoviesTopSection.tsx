import { type Movie } from "../../Types"
import MovieCard from "../cards/MovieCard"

export default function MoviesTopSection({ movies }: { movies: Movie[] }) {

    return (
      <section className="my-4">
      
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-white font-bold">Top Movies</h2>
                <p className="text-primary_3">See more</p>
            </div>
            
           
            <div className="flex gap-4 overflow-x-scroll right-edge-sticky">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} variant="poster" showRating={true} />
                ))}
            </div>
        </section>






    )
}