import { Link } from "react-router-dom"
import BtnLogin from "../../base/BtnLogin"
import not_logged_icon from "/src/assets/not_logged_icon.png"



export default function Header() {

    return (
        <>



            <header className="flex items-center justify-between mx-2 mt-2 mb-5 ">

                <div className=" text-primary_4 ml-2">
                    <Link to="/" ><p className="mb-2">Phong's Bio</p></Link>
                <BtnLogin />
                </div>

                <div>
                    <figure className="w-18 h-18">
                        <img src={not_logged_icon} alt="Home" />
                    </figure>
                   
                </div>

            </header>
        </>
    )
}


