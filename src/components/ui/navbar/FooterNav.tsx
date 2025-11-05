import { Link } from "react-router-dom";
import homeIcon from "/src/assets/home.png";
import exploreIcon from "/src/assets/explore.png";
import savedPlansIcon from "/src/assets/saved_plans.png";
import profileIcon from "/src/assets/profile.png";
// import { useAuth } from "../../../contexts/AuthContext";

export default function FooterNav() {

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
                    <Link to="/saved-plans">
                        <img src={savedPlansIcon} alt="Saved Plans" />
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        <img src={profileIcon} alt="Profile" />
                    </Link>
                </li>



                {/* LOGIN AUTH ELEMENT  */}
                {/* {token ? (
                     
                        <li>
                            <Link to="/favorite-homes">Mine favoritter</Link>
                        </li>
                     ) : null} */}
            </ul>
        </nav>
    )
}