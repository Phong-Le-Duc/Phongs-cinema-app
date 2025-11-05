
import { createBrowserRouter } from "react-router";
import Layout from "./layout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import SavedPlans from "./pages/SavedPlans";
import Profile from "./pages/Profile";
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
                path: '/explore',
                element: <Explore />
            },
            {
                path: '/saved-plans',
                element: <SavedPlans />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    }
]);
export default router;