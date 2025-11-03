
import { createBrowserRouter } from "react-router";
import Layout from "./layout";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
                // loader: homeLoader

            },
            {
                path: 'about',
                element: <About />
            },

            {
                path: '*',
                element: <NotFound />
            }
        ]
    }
]);
export default router;