import AdminHome from "../pages/AdminHome";
import Login from "../pages/Login";
import Register from "../pages/Register"
import StoreHome from "../pages/StoreHome";

const routes = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/admin-home',
        element: <AdminHome />
    },
    {
        path: '/store-home/:storeId',
        element: <StoreHome />
    }
]

export default routes