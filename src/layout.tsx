import { useLocation } from "react-router";
import Header from "./components/ui/header/Header";
import Footer from "./components/ui/footer/Footer";
import { Outlet } from "react-router";
// import { ScrollRestoration } from "react-router";



export default function Layout() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <div className="m-page_margin">
            {/* <ScrollRestoration /> */}

            {/* Only show Header on non-home pages */}
            {!isHomePage && <Header />}

            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}