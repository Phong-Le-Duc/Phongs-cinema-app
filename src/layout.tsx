import { useLocation } from "react-router";
import Header from "./components/ui/header/Header";
import LoggedInHeader from "./components/ui/header/LoggedInHeader";
import NotLoggedInHeader from "./components/ui/header/NotLoggedInHeader";
import Footer from "./components/ui/footer/Footer";
import { Outlet } from "react-router";
import { useAuth } from "./context/AuthContext";
// import { ScrollRestoration } from "react-router";



export default function Layout() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const { user } = useAuth();

    return (
        <div className="m-page_margin max-w-md ">
            {/* <ScrollRestoration /> */}

            {/* Show special header on home, normal header elsewhere */}
            {isHomePage
                ? (user ? <LoggedInHeader /> : <NotLoggedInHeader />)
                : <Header />
            }

            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}