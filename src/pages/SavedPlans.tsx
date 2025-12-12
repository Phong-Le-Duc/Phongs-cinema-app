import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // adjust path as needed

export default function SavedPlans() {
    const { user } = useAuth(); // get the current user
    const key = user ? `bookmarkedMovies_${user.email}` : "bookmarkedMovies_guest";
    const [bookmarkedMovies, setBookmarkedMovies] = useState<{ id: string; title: string; poster_path?: string }[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem(key);
        if (saved) {
            setBookmarkedMovies(JSON.parse(saved));
        }
    }, [key]);

    function handleRemove(id: string) {
        const updated = bookmarkedMovies.filter((movie) => movie.id !== id);
        setBookmarkedMovies(updated);
        localStorage.setItem(key, JSON.stringify(updated));
    }

    return (
        <div className="p-8 bg-gray-950 rounded h-120">
            {bookmarkedMovies.length === 0 ? (
                <p>No movies bookmarked yet.</p>
            ) : (
                <ul className="overflow-y-auto h-full pr-2">
                    {bookmarkedMovies.map((movie) => (
                        <li key={movie.id} className="flex justify-between items-center gap-4 mb-4">
                            {movie.poster_path && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-auto h-24 object-cover rounded"
                                />
                            )}
                            <span className="text-center text-white font-bold">{movie.title}</span>
                            <button
                                className="ml-2 px-2 py-1 bg-blue-400 text-white rounded"
                                onClick={() => handleRemove(movie.id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}