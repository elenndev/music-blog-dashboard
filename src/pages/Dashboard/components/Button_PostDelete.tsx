import React, { useContext } from "react"
import supabase from "../../../components/static/auth"
import { DashboardContext } from "./Context_Dashboard"


const Button_PostDelete: React.FC<{id: number }> = ({ id }) =>{
    const context = useContext(DashboardContext)
    if (!context){
        console.error('DashboardContext não está disponível')
        return null
    }

    const {setOnDeletePost} = context

    const handleDeletePost = async () => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir essa publicação?")
        if (confirmDelete){
            const {data: {user}} = await supabase.auth.getUser();
            if (user){
                if (!user) {
                    return;
                }
                if(user.aud == 'authenticated'){
                    const {error: deleteError, status} = await supabase.from('posts').delete().eq("id", id)
                    console.log("DELETE ", status )
                    if (deleteError){
                        console.log('Erro ao fazer o post', deleteError)
                        return status
                    }
                    setOnDeletePost(true)
                    return status
                }
            }

        }

    }

    return( 
        <button className="btn btn-danger" onClick={handleDeletePost}><p>Deletar</p></button>
    )
}

export default Button_PostDelete