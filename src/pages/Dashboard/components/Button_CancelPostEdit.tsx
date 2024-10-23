
import { useContext } from "react";
import { EditModeContext } from "../components/Context_EditMode"
import cleanForm from "../static/cleanForm"


const Button_CancelPostEdit = () => {
    const context = useContext(EditModeContext);

    if (!context) {
        console.error("EditModeContext não está disponível.");
        return null;
    }
    const { setEditMode } = context;
    function exitEdit(){
        cleanForm()
        setEditMode(false)
        console.log('funcao cancelar edit')
    }

    return(
        <button type="button" className="btn btn-danger" onClick={exitEdit}><p>Cancelar edição</p></button>
    )
}

export default Button_CancelPostEdit