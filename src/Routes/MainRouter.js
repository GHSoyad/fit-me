import { createBrowserRouter, Link } from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout.js/DashboardLayout";
import Batches from "../Pages/Dashboard/AdminPages/Batches/Batches";
import UserDetails from "../Pages/Dashboard/AdminPages/Users/UserDetails";
import Users from "../Pages/Dashboard/AdminPages/Users/Users";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import Transformation from "../Pages/Dashboard/UserPages/Transformation/Transformation";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRouter";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <h1 className="text-center text-xl mt-10">Page Under Construction... <Link to="/"><span className="text-primary hover:underline">Go Back</span></Link></h1>,
        children: [
            {
                path: "/",
                element: <Dashboard></Dashboard>
            },
            {
                path: "/transformation",
                element: <Transformation></Transformation>
            },
            {
                path: "/admin/users",
                element: <Users></Users>
            },
            {
                path: "/admin/user/:email/View-User",
                element: <UserDetails></UserDetails>,
                loader: ({ params }) => params.email
            },
            {
                path: "admin/batches",
                element: <Batches></Batches>
            }
        ]
    },
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/register",
        element: <Register></Register>
    }
])

export default router;