import Editor from "./Editor"
import SubmitForm from "../static/submitForm"
import Button_CancelPostEdit from "./Button_CancelPostEdit"
import DefaultFunction from "../../../components/Type_FunctionDefault"

const Form_post: React.FC<{
onEdit: boolean, 
functionExitEdit: DefaultFunction, 
post_id? : number}> = ({onEdit, functionExitEdit, post_id}) => {
    let reqType = null
    let id = 0

    
    const style = {
        width: '900px',
        marginTop: '20px'
    }
    const submitStyle = {
        marginTop: '10px'
    }
    
    if(onEdit){
        reqType = 'put'
        if(post_id){id = post_id}
        
    } else {
        reqType = 'post'
    }

    return(

        <form onSubmit={(event)=> SubmitForm(event, {reqType},{id})} style={style}>
            <Editor />
            <input type="url" id="cover" style={submitStyle}></input>
            {onEdit ?
                <>
                    <button className="btn btn-primary" id="form_submit" 
                    style={submitStyle} 
                    type="submit">
                        Salvar alterações
                    </button>
                    <Button_CancelPostEdit functionExitEdit={functionExitEdit}/> 
                </> :
                    <button className="btn btn-primary" id="form_submit" 
                    style={submitStyle} type="submit">
                        Enviar
                    </button>
            }
        </form>
    )
}

export default Form_post