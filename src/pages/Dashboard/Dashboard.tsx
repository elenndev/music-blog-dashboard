import { useState } from "react"
import AllPosts from "../AllPosts/AllPosts"
import Form_pots from "./components/Form_post"
import exitEditMode from "./static/exitEditMode"

const Dashboard = () => {
    const style:  React.CSSProperties = {
        width: '100%', 
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }

    const[postId, setId] = useState(0)
    const[onEdit, setOnEdit] = useState(false)
    const handleButtonEdit = (id: number) => {
        if (onEdit){
            // ao clicar em cancelar alteração
            setOnEdit(false)
            console.log('estava verdadeiro mudoui pra false')
        } else{
            // ao clicar no button editar no card do post
            setOnEdit(true)
            setId(id)
            console.log('estava false mudou pra true')
        }
    }
    
    const exitEdit = () => {
        // cleanForm()
        // setOnEdit(false)
        exitEditMode(setOfEdit)
    }

    function setOfEdit(){
        setOnEdit(false)
    }

    return(
        <main style={style}>
            <Form_pots onEdit={onEdit} 
            functionExitEdit={exitEdit} 
            post_id={postId}/>
            <AllPosts 
            isDashboard={true} 
            functionEdit={handleButtonEdit}
            onEdit={onEdit}/>
        </main>
    )
}

export default Dashboard
