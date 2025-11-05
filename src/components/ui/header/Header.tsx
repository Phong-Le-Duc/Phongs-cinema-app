import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();

    // Map routes to their display text and icons
    function getPageInfo() {
        switch (location.pathname) {
            case "/explore":
                return { title: "Explore", icon: "/src/assets/explore.png" };
            case "/saved-plans":
                return { title: "Saved Plans" };
            case "/profile":
                return { title: "Settings" };

            case "/details":
                return { title: "Details Movie", icon: "/src/assets/saved_plans.png" };

            default:
                return { title: "Page", icon: "/src/assets/default-icon.png" };
        }
    };

    // const {title} = getPageInfo();
    // const icon = getPageInfo().icon;
    const { title, icon } = getPageInfo();

    return (
        <header className="flex justify-between mb-6">
            <button onClick={() => navigate(-1)}>
                <img src="/src/assets/btn-back.png" alt="Go back" />
            </button>
            <h1>{title}</h1>
            <div className="w-6 h-6">
                {icon && <img src={icon} alt={title} />}
            </div>
        </header>
    );
}