import Editor from "./Editor"
import SubmitForm from "../static/submitForm"
import Button_CancelPostEdit from "./Button_CancelPostEdit"
// import DefaultFunction from "../../../components/Type_FunctionDefault"
import { useContext, useEffect } from "react"
import { EditModeContext } from "./Context_EditMode"
// import { EditModeProvider } from "./Context_EditMode"

const Form_post: React.FC<{post_id?: number
}> = ({ post_id }) => {
    let reqType = null
    let id = 0


    const style = {
        width: '900px',
        marginTop: '20px'
    }
    const submitStyle = {
        marginTop: '10px'
    }

    const context = useContext(EditModeContext)
    if (!context) {
        throw new Error("EditModeContext não está disponível.");
    }

    const {onEdit} = context
    console.log('inicialmente o form recebe onEdit como ', onEdit)
    useEffect(() => {
        console.log("Estado de edição mudou:", context);
        // Reagir às mudanças do contexto, se necessário
    }, [onEdit]);


    if (onEdit) {
        reqType = 'put'
        if (post_id) { id = post_id }
        console.log('detectado no form que é true, req:', reqType)

    } else {
        reqType = 'post'
        console.log('detectado no form que é false, req:', reqType)
    }


    return (
        <form onSubmit={(event) => SubmitForm(event, { reqType }, { id })} style={style}>
            <Editor />
            <input type="url" id="cover" style={submitStyle}></input>
            {onEdit && (
                <>
                    <button className="btn btn-primary" id="form_submit"
                        style={submitStyle}
                        type="submit">
                        Salvar alterações
                    </button>
                    <Button_CancelPostEdit />
                </>)}
            {!onEdit &&
                <button className="btn btn-primary" 
                id="form_submit"
                style={submitStyle} 
                type="submit">
                    Enviar
                </button>}
        </form>
    )
}

export default Form_post