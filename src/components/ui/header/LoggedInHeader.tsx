import logged_icon from "/src/assets/logged_icon.png"


export default function LoggedInHeader () {

return (
      



            <header className="flex items-center justify-between  mt-2 mb-5 ">

                <div className=" text-primary_4">
                    <p className="mb-2">Welcome back.</p>
                    <p className="font-bold">USER</p>
                </div>

                <div>
                    <figure className="w-18 h-18 mr-[-0.5rem]">
                        <img src={logged_icon} alt="Home" />
                    </figure>

                </div>

            </header>
      
)
}