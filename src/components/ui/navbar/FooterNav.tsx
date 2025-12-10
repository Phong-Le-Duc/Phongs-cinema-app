import { Link, useNavigate } from "react-router-dom";
import homeIcon from "/src/assets/home.png";
import exploreIcon from "/src/assets/explore.png";
import savedPlansIcon from "/src/assets/btn-Bookmark-saved.png";
import profileIcon from "/src/assets/profile.png";
import { useAuth } from "../../../context/AuthContext";

export default function FooterNav() {
    const { user } = useAuth();
    const navigate = useNavigate();

    function handleSavedPlansClick(e: React.MouseEvent) {
        if (!user) {
            e.preventDefault();
            navigate("/login");
        }
        // else: allow normal navigation to /saved-plans
    }

    return (
        <nav className="pt-8">
            <ul className="flex justify-between">
                <li>
                    <Link to="/">
                        <img src={homeIcon} alt="Home" />
                    </Link>
                </li>
                <li>
                    <Link to="/explore">
                        <img src={exploreIcon} alt="Explore" />
                    </Link>
                </li>
                <li>
                    <Link to="/saved-plans" onClick={handleSavedPlansClick}>
                        <img src={savedPlansIcon} alt="Saved Plans" />
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        <img src={profileIcon} alt="Profile" />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}