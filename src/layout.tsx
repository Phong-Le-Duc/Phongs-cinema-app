import Header from "./components/ui/header/Header";
import Footer from "./components/ui/footer/Footer";
import { Outlet } from "react-router";
import { ScrollRestoration } from "react-router";



export default function Layout() {


    return (
        <div>
            <ScrollRestoration />
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}