import { Link } from "react-router-dom";
// import homeIcon from "/src/assets/home.png";
// import { useAuth } from "../../../contexts/AuthContext";

export default function Navbar() {

    return (
        <>
            <>
                <div className="p-5 " >
                    <div className="header-width flex items-center justify-between gap-4">

                     

                        <ul className="flex items-center space-x-4 bg-dinmaegler-white ml-auto">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/link_1">link_1</Link>
                            </li>
                            <li>
                                <Link to="/link_2">link_2</Link>
                            </li>

                            {/* LOGIN AUTH ELEMENT  */}
                            {/* {token ? (
                     
                        <li>
                            <Link to="/favorite-homes">Mine favoritter</Link>
                        </li>
                     ) : null} */}

                            <li>
                                <Link to="/Contact">Kontakt</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </>

        </>
    )
}