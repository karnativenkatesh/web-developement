import { ReactSession } from "react-client-session";
import { Outlet } from "react-router-dom";
import Login from "./Login";

const useAuth = () => {
    const user = ReactSession.get("Registernum");
    return user;
}

const ProtedtedRoute = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet />:<Login />;
}

export default ProtedtedRoute;