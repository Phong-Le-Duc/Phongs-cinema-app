import SearchInput from "../components/common/SeachInput"
import ComingMoviesSection from "../components/sections/ComingMoviesSection"

// import { useAuth } from "../contexts/AuthContext" // when you have auth




export default function Explore() {
    

    return (
        <>
          

            <SearchInput />
          
            <div className="right-edge-sticky my-4">
                <ComingMoviesSection />
            </div>
          
         
        </>
    )
}

