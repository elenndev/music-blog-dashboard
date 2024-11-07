import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;


export async function checkAuth(){
    const full_token = localStorage.getItem('token')
    if (!full_token){
        return false
    }

    try{
        const validateToken = await axios.get(`${API_URL}/check-token`,{
            headers: {
                Authorization: `Bearer ${full_token}`
            }
        })
        return validateToken.data
    } catch(error){
        console.error('Erro ao fazer o check token', error)
        return false
    }
    
}