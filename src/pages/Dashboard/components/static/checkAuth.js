import { jwtDecode } from "jwt-decode"
export function checkAuth(){
    const token = localStorage.getItem('token')
    if (!token){
        // colocar aqui pra encaminhar pra pagina de login
        return false
    }
    let payload = null
    try{
        const decode = jwtDecode(token)
        payload = decode.exp
        console.log(decode)
    } catch(error){
        return(error)
    }
    const expired = payload * 1000 < Date.now()
    console.log(expired)
    
    const session = () => {token & !expired ? true : false}
    return session
    
}