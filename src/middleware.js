import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL;

// Autenticação --> Substituir pela requisição da sua própria API
/// Verifica a existência do token de usuario administrador no cookie
export async function checkAuth(){
    try{
        const response = await axios.get(`${API_URL}/check-token`,{withCredentials: true})
        if (response.data.status_code == 200){
            return response
        }
    } catch(error){
        console.error('Erro ao fazer o check token |  Erro: ', error.response.data.detail)
        return error.response
    }
}