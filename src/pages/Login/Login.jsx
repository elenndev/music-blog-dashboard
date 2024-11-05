import { createClient } from "@supabase/supabase-js";
import axios from 'axios'
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";
import supabase from "../../components/static/supabaseauth"
import Button_SignOut from "../Dashboard/components/Button_SignOut";
const API_URL = import.meta.env.VITE_API_URL;


export default function Login() {
    const [session, setSession] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async(e) =>{
        console.log('chegou aqui, tentar: ', API_URL)
        e.preventDefault()
        const payload = {
            username: username,
            password: password
        }
        try{
            const response = await axios.post(`${API_URL}/login`, payload)

            const token = response.data
            localStorage.setItem('token',token)
            console.log('login bem sucedido: ', token)
        } catch (error){
            console.log('erro', error.response ? error.response.data : error.message)
        }
    }

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session !== null) {
                setSession(session);
            }
        };
        getSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (!session) {
        return (
            <div
                style={{
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div>
                    <form onSubmit={handleLogin}>
                        <label htmlFor="username">Usuário:</label>
                        <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required></input>
                        <label htmlFor="password">Senha:</label>
                        <input type="password" name="input_password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div>Logged in!</div>
                <Button_SignOut/>
            </div>
        );
    }
}
