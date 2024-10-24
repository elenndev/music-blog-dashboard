import Editor from "./Editor"
import SubmitForm from "./static/submitForm"
import Button_CancelPostEdit from "./Button_CancelPostEdit"
import { useContext, useEffect, useState } from "react"
import { EditModeContext} from "./Context_EditMode"
import cleanForm from "./static/cleanForm"

const Form_post: React.FC<{
    post_id?: number
}> = ({ post_id }) => {
    let reqType = ''
    let id = 0


    const style = {
        width: '900px',
        marginTop: '20px'
    }
    const submitStyle = {
        marginTop: '10px'
    }

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitFail, setIsSubmitFail] = useState(false)
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)
    

    const context = useContext(EditModeContext)
    const handleSubmit = async (event: React.FormEvent) => {
        setIsSubmitting(true)
        setIsSubmitFail(false)
        setIsSubmitSuccess(false)
        try {
            const result = await SubmitForm(event, { reqType }, { id }, context)
            if (result !== null){
                setIsSubmitting(true)
            }
            else if (result === 200 || result === 201) {
                setIsSubmitSuccess(true)
            } else {
                setIsSubmitFail(true)
            }
            console.log('recebendo status', result)
        } catch (error: any) {
            setIsSubmitFail(true)
            console.log("ERRO:",error.message)
        } finally {
            setIsSubmitting(false)
            setOnSubmittedPost(true)
            cleanForm()
        }
    }

    if (!context) {
        throw new Error("EditModeContext não está disponível.");
    }
    const { onEdit, setOnSubmittedPost } = context

    useEffect(() => {
        console.log("Estado de edição mudou no form:", onEdit);
        
        if (!onEdit){
            setIsSubmitFail(false)
            setIsSubmitSuccess(false)
        }
        if (onEdit) {
            reqType = 'put'
            if (post_id) { id = post_id }
            console.log('detectado no form que é true, req:', reqType)
    
        } else {
            reqType = 'post'
            console.log('detectado no form que é false, req:', reqType)
        }    
    }, [onEdit]);





    return (
        <>
            <form onSubmit={handleSubmit} style={style} id="form_post">
                <Editor />
                <label>Capa da publicação:</label>
                <input name="cover" type="url" id="cover" style={submitStyle} placeholder="Insira a a url da imagem"></input>
                {isSubmitFail && <p style={{ color: 'red' }}>{isSubmitFail}</p>}
                {isSubmitSuccess && <p style={{ color: 'green' }}>{isSubmitSuccess}</p>}
                <button className="btn btn-primary"
                    id="form_submit"
                    style={submitStyle}
                    type="submit"
                    disabled={isSubmitting}>
                    {onEdit
                        ? (isSubmitting
                            ? <>Salvando...</>
                            : <>Salvar alterações</>)
                        : (isSubmitting
                            ? <>Salvando...</>
                            : <>Enviar publicação</>)
                    }
                </button>
                {onEdit && !isSubmitting && <Button_CancelPostEdit />}
            </form>
        </>
    )
}

export default Form_post