import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    // Map routes to their display text and icons
    function getPageInfo() {
        // Check for dynamic routes first
        if (location.pathname.startsWith("/movie/")) {
            return { title: "Movie detail", icon: "/src/assets/saved_plans.png" };
        }
        if (location.pathname.startsWith("/select-seats/")) {
            return { title: "Select Seats" }; // Use your ticket icon
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
                return { title: "E-Ticket" }; // Add this line
            default:
                return { title: "Page Not Found", icon: "/src/assets/default-icon.png" };
        }
    };

    // const {title} = getPageInfo();
    // const icon = getPageInfo().icon;
    const { title, icon } = getPageInfo();

    return (
        <header className="flex items-center justify-between mb-6">
            <button onClick={() => navigate(-1)} className="flex items-center cursor-pointer">
                <img src="/src/assets/btn-back.png" alt="Go back" className="w-6 h-6 object-contain" />
            </button>
            <h1>{title}</h1>
            <div className="w-6 h-6 flex items-center justify-center">
                {icon && <img src={icon} alt={title} className="w-full h-full object-contain" />}
            </div>
        </header>
    );
}