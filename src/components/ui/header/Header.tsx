import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useState, useEffect } from "react";
import { useMovie } from "../../../context/MovieContext";
import btnBookmarkSaved from "../../../assets/btn-Bookmark-saved.png";
import btnBookmarkUnsaved from "../../../assets/btn-Bookmark-unsaved.png";
import btnBack from "../../../assets/btn-back.png";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { movie } = useMovie();

    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (movie.id) {
            const savedMovies = JSON.parse(localStorage.getItem("bookmarkedMovies") || "[]");
            setIsSaved(savedMovies.some((m: any) => m.id === movie.id));
        }
    }, [movie.id]);

    // Use the same key as in SavedPlans
    const key = user ? `bookmarkedMovies_${user.email}` : "bookmarkedMovies_guest";

    function handleIconClick() {
        if (!user) {
            navigate("/login");
        } else if (movie.id && movie.title) {
            const savedMovies = JSON.parse(localStorage.getItem(key) || "[]");
            if (!isSaved) {
                const movieData = { id: movie.id, title: movie.title, poster_path: movie.poster_path };
                localStorage.setItem(key, JSON.stringify([...savedMovies, movieData]));
                setIsSaved(true);
            } else {
                const updated = savedMovies.filter((m: any) => m.id !== movie.id);
                localStorage.setItem(key, JSON.stringify(updated));
                setIsSaved(false);
            }
        }
    }

    const bookmarkIcon = isSaved ? btnBookmarkSaved : btnBookmarkUnsaved;

    function getPageTitle() {
        if (location.pathname.startsWith("/movie/")) {
            return "Movie detail";
        }

        if (location.pathname.startsWith("/select-seats")) {
            return "Book Tickets";
        }

        switch (location.pathname) {
            case "/":
                return "Home";
            case "/explore":
                return "Explore";
            case "/saved-plans":
                return "Bookmarked Movies";
            case "/profile":
                return "Profile";
            case "/login":
                return "Login";
            case "/register":
                return "Register account";
            case "/checkout":
                return "Payment And Checkout";
            case "/eticket":
                return "Your E-ticket";

            // Add more cases as needed
            default:
                return "Page Not Found";
        }
    }

    return (
        <header className="flex items-center justify-between mb-6">
            <button onClick={() => navigate(-1)} className="flex items-center cursor-pointer">
                <img src={btnBack} alt="Go back" className="w-6 h-6 object-contain" />
            </button>
            <h1>{getPageTitle()}</h1>
            <div className="w-6 h-6 flex items-center justify-center">
                {location.pathname.startsWith("/movie/") && movie.id && (
                    <img
                        src={bookmarkIcon}
                        alt={isSaved ? "Saved" : "Unsaved"}
                        className="w-full h-full object-contain cursor-pointer"
                        onClick={handleIconClick}
                    />
                )}
            </div>
        </header>
    );
}