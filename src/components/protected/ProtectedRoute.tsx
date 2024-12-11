import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
    isAdmin?: boolean;
}

export default function ProtectedRoute({ children, isAdmin }: ProtectedRouteProps) {
    const navigate = useNavigate();
    const userString = localStorage.getItem("user");
    let user = null;

    if (userString) {
        try {
            user = JSON.parse(userString);
        } catch (error) {
            console.error("Error parsing user data:", error);
        }
    }

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else if (isAdmin && !user.isAdmin) {
            navigate("/");
        }
    }, [user, isAdmin, navigate]);

    if (!user || (isAdmin && !user.isAdmin)) {
        return null;
    }

    return <>{children}</>;
}