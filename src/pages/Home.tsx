import SearchInput from "../components/common/SeachInput"
import NearYouSection from "../components/sections/NearYouSection"
import ComingMoviesSection from "../components/sections/ComingMoviesSection"
import NotLoggedInHeader from "../components/ui/header/NotLoggedInHeader"
import LoggedInHeader from "../components/ui/header/LoggedInHeader"
// import { useAuth } from "../contexts/AuthContext" // when you have auth




export default function Home() {
    // const { isLoggedIn } = useAuth(); // Replace with your actual auth check
    const isLoggedIn = false; // Temporary - replace with real auth

    return (
        <>
            {/* Conditional header based on login status */}
            {isLoggedIn ? <LoggedInHeader /> : <NotLoggedInHeader />}

            <SearchInput />
            <div className="right-edge-sticky my-4">
                <ComingMoviesSection />
            </div>
            <NearYouSection />
        </>
    )
}

