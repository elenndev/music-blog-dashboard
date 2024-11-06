import { jwtDecode } from "jwt-decode"
import jwt from "jsonwebtoken"
const KEY = import.meta.env.VITE_KEY;

export function checkAuth(){
    const full_token = localStorage.getItem('token')
    if (!full_token){
        return false
    }
    const token = jwtDecode(full_token)
    const expired = token.exp * 1000 < Date.now()
    if (expired){
        return false
    }
    
    if (!token){
        return false
    } else {
        return true
    }
    
}