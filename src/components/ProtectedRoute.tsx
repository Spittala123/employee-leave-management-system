
import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "./services/AuthService";

const ProtectedRoute = ({ children, allowedRoutes }: { children: React.ReactNode, allowedRoutes: string[] }) => {

    const isAuthenticated = AuthService.isAuthenticated();
    const userRole = AuthService.getRole();
    if (!isAuthenticated) return <Navigate to="/login" replace />
    if (!allowedRoutes.includes(userRole!)) return <Navigate to="/unauthorized" replace />


    return children;
}

export default ProtectedRoute;


// *************************************** //

// import React from "react";
// import AuthService from "../services/AuthService";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//     return AuthService.isAuthenticated() ?
//         React.createElement(React.Fragment, null, children) :
//         React.createElement(Navigate, { to: "/Login" });
// }

// export default ProtectedRoute;