import { useContext } from "react"
import { DashboardContext } from "./Context_Dashboard"
import cleanForm from "./static/cleanForm"

const Button_GoToDrafts = () =>{
    const context = useContext(DashboardContext)
    if (!context){
        console.error("DasoardContext não está disponível")
        return null
    }
    const {onDrafts,setOnDrafts} = context
    const handleSetOnDrafts = () => {
        if(onDrafts){
            setOnDrafts(false)
            cleanForm()
        } else {
            setOnDrafts(true)
        }
    }

    return(
        <button className="btn btn-primary" onClick={handleSetOnDrafts}>{onDrafts? <p>Ver rascunhos</p> : <p>Sair dos rascunhos</p>}</button>
    )
}

export default Button_GoToDrafts