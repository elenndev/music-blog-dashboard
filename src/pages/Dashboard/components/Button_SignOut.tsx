import supabase from "../../../components/static/auth"

const Button_SignOut = () =>{
    return(
        <button className="btn btn-primary" onClick={() => supabase.auth.signOut()}>Sign out</button>
    )
}

export default Button_SignOut