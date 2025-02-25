
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
