import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import { supabase } from "../../../auth";  // Você deve mover a lógica de criação do supabase para um arquivo separador
import { createClient } from "@supabase/supabase-js";
import supabase from "../../../auth"

const ProtectedRoute = ({ children }) => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setLoading(false);
        };

        checkSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;  // Pode exibir um spinner de carregamento, por exemplo
    }

    if (!session) {
        return <Navigate to="/blog-login" />;
    }

    return children;
};

export default ProtectedRoute;
