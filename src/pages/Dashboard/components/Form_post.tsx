import Editor from "./Editor"
import SubmitForm from "../static/submitForm"
import Button_CancelPostEdit from "./Button_CancelPostEdit"
import DefaultFunction from "../../../components/Interface_Function"

const Form_post: React.FC<{onEdit: boolean, handleButton: DefaultFunction, post_id? : number}> = ({onEdit, handleButton, post_id}) => {
    let reqType = null
    let id = null

    
    const style = {
        width: '900px',
        marginTop: '20px'
    }
    const submitStyle = {
        marginTop: '10px'
    }
    
    if(onEdit){
        reqType = 'put'
        id = post_id
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
                    style={submitStyle} type="submit">
                        Salvar alterações
                    </button>
                    <Button_CancelPostEdit cancelEdit={handleButton}/> 
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