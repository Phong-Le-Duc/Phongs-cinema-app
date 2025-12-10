import { Link } from "react-router-dom"
import { type MovieCardProps } from "../../Types" //typescript import






export default function MovieCard({ movie, variant = "backdrop", showRating = false }: MovieCardProps) {

    // Choose image based on variant
    const imagePath = variant === "poster" || variant === "poster-small" || variant === "poster-large"
        ? movie.poster_path
        : movie.backdrop_path;
    const imageUrl = `https://image.tmdb.org/t/p/w500${imagePath}`;

    // Choose width based on variant
    // 🟩 JavaScript: Ternary operator for different sizes
    const width =
        variant === "poster-large"
            ? "w-56"
            : variant === "poster"
                ? "w-40"
                : variant === "poster-small"
                    ? "w-32"
                    : "w-64";



    // RATING SYSTEM
    // Convert vote_average (0-10) to stars (0-5)
    const rating = movie.vote_average / 2; // fx 8.4 / 2 = 4.2
    const fullStars = Math.floor(rating); // 4
    const hasHalfStar = rating % 1 >= 0.5; // true if .5 or more
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className={`${width} flex-shrink-0`}>
            <Link to={`/movie/${movie.id}`}>
                <img src={imageUrl} alt={movie.title} className="w-full rounded-lg" />
                <h3 className="text-white font-bold mt-2 text-sm">{movie.title}</h3>
            </Link>

            {/* RATING STJERNER - controlled by showRating prop */}
            {showRating && (
                <div className="flex items-center gap-1 mt-1">
                    {/* Fyldte stjerner */}
                    {[...Array(fullStars)].map((_, i) => (
                        <span key={`full-${i}`} className="text-yellow-400">★</span>
                    ))}
                    {/* Halv stjerne */}
                    {hasHalfStar && <span className="text-yellow-400">☆</span>}
                    {/* Tomme stjerner */}
                    {[...Array(emptyStars)].map((_, i) => (
                        <span key={`empty-${i}`} className="text-gray-600">☆</span>
                    ))}
                </div>
            )}

            <p className="text-xs text-gray-500 mt-1">{movie.release_date}</p>
        </div>
    )
}