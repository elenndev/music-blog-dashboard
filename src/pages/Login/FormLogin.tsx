import Login from "../../../auth"

const FormLogin = () => {

    return(
        <>
            <form onSubmit={Login}>
                <input name="email" 
                type="email"
                placeholder="email"
                id="email"></input>
                <input name="password" 
                type="password"
                id="password"></input>
                <button type="submit" id="button_login">Save</button>
            </form>
        </>
    )
}

export default FormLogin