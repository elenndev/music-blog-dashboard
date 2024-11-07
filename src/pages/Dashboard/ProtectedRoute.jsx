import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkAuth } from "./components/static/checkAuth";

const ProtectedRoute = ({ children }) => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleCheckSession = async () => {
        const checkSession = await checkAuth()
        setSession(checkSession)   
        setLoading(false)
    }

    useEffect(() => {
        handleCheckSession()
    }, []);

    if (loading) {
        return <div>Loading...</div>;  
    }

    if (session) {
        return children;
    } else{
        return <Navigate to="/blog-login" />;
    }

};

export default ProtectedRoute;
