import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useState, useEffect } from "react";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const params = useParams();

    // Example: get movieId from URL params
    const movieId = params.id; // if your route is /movie/:id

    // You may need to get movieTitle from context or loader if available
    const movieTitle = ""; // Set this to the correct value if possible

    // Track saved state for the bookmark icon
    const [isSaved, setIsSaved] = useState(false);

    // Map routes to their display text and icons
    function getPageInfo() {
        if (location.pathname.startsWith("/movie/")) {
            return { title: "Movie detail" };
        }
        if (location.pathname.startsWith("/select-seats/")) {
            return { title: "Select Seats" };
        }
        switch (location.pathname) {
            case "/":
                return { title: "Home", icon: "/src/assets/home-icon.png" };
            case "/explore":
                return { title: "Explore", icon: "/src/assets/explore.png" };
            case "/saved-plans":
                return { title: "Saved Plans" };
            case "/profile":
                return { title: "Settings" };
            case "/checkout":
                return { title: "Checkout" };
            case "/eticket":
                return { title: "E-Ticket" };
            case "/login":
                return { title: "Login" };
            case "/register":
                return { title: "Register" };
            default:
                return { title: "Page Not Found", icon: "/src/assets/default-icon.png" };
        }
    }

    const { title } = getPageInfo();

    // Handler for icon click
    function handleIconClick() {
        if (!user) {
            navigate("/login");
        } else if (movieId) {
            const savedMovies = JSON.parse(localStorage.getItem("bookmarkedMovies") || "[]");
            if (!isSaved) {
                const movieData = { id: movieId, title: movieTitle };
                localStorage.setItem("bookmarkedMovies", JSON.stringify([...savedMovies, movieData]));
                setIsSaved(true);
            } else {
                const updated = savedMovies.filter((m: any) => m.id !== movieId);
                localStorage.setItem("bookmarkedMovies", JSON.stringify(updated));
                setIsSaved(false);
            }
        }
    }

    // Choose icon based on saved state
    const bookmarkIcon = isSaved
        ? "/src/assets/btn-Bookmark-saved.png"
        : "/src/assets/btn-Bookmark-unsaved.png";

    return (
        <header className="flex items-center justify-between mb-6">
            <button onClick={() => navigate(-1)} className="flex items-center cursor-pointer">
                <img src="/src/assets/btn-back.png" alt="Go back" className="w-6 h-6 object-contain" />
            </button>
            <h1>{title}</h1>
            <div className="w-6 h-6 flex items-center justify-center">
                {location.pathname.startsWith("/movie/") && (
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