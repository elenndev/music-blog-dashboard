import { useState } from "react"
import AllPosts from "../AllPosts/AllPosts"
import Form_pots from "./components/Form_post"

const Dashboard = () => {
    const style:  React.CSSProperties = {
        width: '100%', 
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }

    const[onEdit, setOnEdit] = useState(false)
    const handleButtonEdit = () => {
        if (onEdit){
            setOnEdit(false)
            console.log('estava verdadeiro mudoui pra false')
        } else{
            setOnEdit(true)
            console.log('estava false mudou pra true')
        }
    }

    return(
        <main style={style}>
            <Form_pots onEdit={onEdit} handleButton={handleButtonEdit}/>
            <AllPosts isDashboard={true} handleButton={handleButtonEdit}/>
        </main>
    )
}

export default Dashboard
