import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../components/UserContext/UserContext";

const ProtectedRoute = ({ isAllowed, redirectPath = "/app", children }) => {
  const context = {};
  if (context.loading) {
    <h2>Loading....</h2>;
  } else {
    if (!isAllowed) {
      return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
  }
};

export default ProtectedRoute;
