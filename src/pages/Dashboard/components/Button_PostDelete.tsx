import axios from "axios"
import React from "react"


const Button_PostDelete: React.FC<{id: number }> = ({ id }) =>{
    
    const deletePost = async () => {
        try{
            const response = await axios.delete(`http://127.0.0.1:8000/delete-post/${id}`)

            if (response.status == 200){
                console.log("Post deletado com sucesso")
            } else {
                throw new Error ('Erro ao deletar Post')
            }
        } catch (error){
            console.error('Erro:', error);
        }
    }

    return( 
        <button className="btn btn-danger" onClick={deletePost}>Deletar</button>
    )
}

export default Button_PostDelete