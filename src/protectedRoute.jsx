import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { getUserProfile } from "./api/yarn-swap-api";
import AdminPage from "./pages/adminPage";

function ProtectedRoute() {

    const { data: userProfile } = useQuery('getUserProfile', getUserProfile)
    var isAdminUser = Boolean(userProfile?.role == "admin");

    if (isAdminUser) {
        return <AdminPage />
    }
    return (
        <Navigate to="/login" />
    )
}

export default ProtectedRoute;
