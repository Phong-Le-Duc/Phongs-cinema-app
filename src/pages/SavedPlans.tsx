import { useEffect, useState } from "react";

export default function SavedPlans() {
    const [bookmarkedMovies, setBookmarkedMovies] = useState<{ id: string; title: string }[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("bookmarkedMovies");
        if (saved) {
            setBookmarkedMovies(JSON.parse(saved));
        }
    }, []);

    return (
        <div className="h-60 bg-green-100 p-4">
            <h2 className="font-bold mb-2">Bookmarked Movies</h2>
            {bookmarkedMovies.length === 0 ? (
                <p>No movies bookmarked yet.</p>
            ) : (
                <ul>
                    {bookmarkedMovies.map((movie) => (
                        <li key={movie.id}>{movie.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}