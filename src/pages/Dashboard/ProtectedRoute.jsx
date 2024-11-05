import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import supabase from "../../components/static/supabaseauth"
import { checkAuth } from "./components/static/checkAuth";

const ProtectedRoute = ({ children }) => {
    const [session, setSession] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // setSession(checkAuth())
        checkAuth()
        // console.log(session)
    }, []);

    if (loading) {
        return <div>Loading...</div>;  
    }

    if (!session) {
        return <Navigate to="/blog-login" />;
    } else{
        return children;
    }

};

export default ProtectedRoute;
