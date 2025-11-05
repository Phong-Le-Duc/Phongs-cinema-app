import { Link } from "react-router-dom"
import BtnLogin from "../../common/BtnLogin"
import not_logged_icon from "/src/assets/not_logged_icon.png"



export default function NotLoggedInHeader() {

    return (
      



            <header className="flex items-center justify-between  mt-2 mb-5 ">

                <div className=" text-primary_4">
                    <Link to="/" ><p className="mb-2">Phong's Bio</p></Link>
                    <BtnLogin />
                </div>

                <div>
                    <figure className="w-18 h-18 mr-[-0.5rem]">
                        <img src={not_logged_icon} alt="Home" />
                    </figure>

                </div>

            </header>
     
    )
}


