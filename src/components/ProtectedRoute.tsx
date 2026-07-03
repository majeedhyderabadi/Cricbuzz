import React, { memo } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    element: React.ReactElement;
    requireAdmin?: boolean;
}

const ProtectedRoute = memo(function ProtectedRoute({
    element,
    requireAdmin = false,
}: ProtectedRouteProps) {
    const { isAuthenticated, isAdmin } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/access-denied" replace />;
    }

    return element;
});

export default ProtectedRoute;