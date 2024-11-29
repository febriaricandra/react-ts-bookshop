import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
    const navigate = useNavigate();
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    
        if (!user) {
            navigate("/login");
        }
    
        if (user && !JSON.parse(user).isAdmin) {
            navigate("/");
        }
    } , [user, token, navigate]);


    return children;
}