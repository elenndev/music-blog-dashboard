import { useNavigate } from "react-router-dom"

const Button_SignOut: React.FC = () =>{
    const navigate = useNavigate()
    const handleSignOut = () =>{
        localStorage.removeItem('token')
        navigate('/blog-login')
    }
    return(
        <button className="btn btn-primary" onClick={handleSignOut}>Sign out</button>
    )
}

export default Button_SignOut