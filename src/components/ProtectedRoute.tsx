import React, { memo } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    element: React.ReactElement;
    requireAdmin?: boolean;
    requireSuperAdmin?: boolean;
}

const ProtectedRoute = memo(function ProtectedRoute({
    element,
    requireAdmin = false,
    requireSuperAdmin = false,
}: ProtectedRouteProps) {

    const {
        isAuthenticated,
        isAdmin,
        isSuperAdmin
    } = useAuth();

    // User logged in nahi hai
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Admin page:
    // Admin aur SuperAdmin dono access kar sakte hain
    if (requireAdmin && !isAdmin && !isSuperAdmin) {
        return <Navigate to="/access-denied" replace />;
    }

    // SuperAdmin page:
    // Sirf SuperAdmin access kar sakta hai
    if (requireSuperAdmin && !isSuperAdmin) {
        return <Navigate to="/access-denied" replace />;
    }

    return element;
});

export default ProtectedRoute;