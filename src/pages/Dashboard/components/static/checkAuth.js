export function checkAuth(){
    const full_token = localStorage.getItem('token')

    const expired = payload.exp * 1000 < Date.now()
    
    const session = () => {token & !expired ? true : false}
    return session
    
}