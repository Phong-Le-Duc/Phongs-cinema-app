import { createBrowserRouter } from "react-router";
import Layout from "./layout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import SavedPlans from "./pages/SavedPlans";
import Profile from "./pages/Profile";
import Details from "./pages/Details";
import NotFound from "./pages/NotFound";
// import { UpcomingMoviesLoader, ExploreLoader } from "./loaders/LoaderMovie";
import { LoaderDetails } from "./loaders/LoaderDetails";
import { LoaderHome } from "./loaders/LoaderHome";
import { ExploreLoader } from "./loaders/LoaderMovie";
import { LoaderCinemas } from "./loaders/LoaderCinemas";
import SelectSeats from "./pages/SelectSeats";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
                loader: LoaderHome

            },
            {
                path: '/explore',
                element: <Explore />,
                loader: ExploreLoader
            },
            {
                path: '/movie/:id',
                element: <Details />,
                loader: LoaderDetails
            },
            {
                path: '/saved-plans',
                element: <SavedPlans />
            },
            {
                path: '/select-seats/:movieId',
                element: <SelectSeats />,
                loader: LoaderCinemas
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