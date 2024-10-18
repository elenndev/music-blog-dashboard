import Editor from "./Editor"
import SubmitForm from "../static/submitForm"
import Button_CancelPostEdit from "./Button_CancelPostEdit"
// import DefaultFunction from "../../../components/Type_FunctionDefault"
import { useContext, useEffect, useState } from "react"
import { EditModeContext } from "./Context_EditMode"
import cleanForm from "../static/cleanForm"
// import { redirect } from "react-router-dom"
// import { EditModeProvider } from "./Context_EditMode"

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
    const [isSubmitFail, setIsSubmitFail] = useState<string | null>(null)
    const [isSubmitSuccess, setIsSubmitSuccess] = useState<string | null>(null)
    const handleSubmit = async (event: React.FormEvent) => {
        setIsSubmitting(true)
        setIsSubmitFail(null)
        setIsSubmitSuccess(null)
        try {
            const result = await SubmitForm(event, { reqType }, { id })
            setIsSubmitSuccess("Formulario enviado!")
            console.log('resutlado do submit form:', result)
        } catch (error: any) {
            setIsSubmitFail('Erro ao enviar o fomulário')
            console.log(error.message)
        } finally {
            setIsSubmitting(false)
            cleanForm()
        }
    }

    const context = useContext(EditModeContext)
    if (!context) {
        throw new Error("EditModeContext não está disponível.");
    }

    const { onEdit } = context
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

    // function savePost() {
    //     setIsSubmitting(false)
    // }


    return (
        <form onSubmit={handleSubmit} style={style}>
            <Editor />
            <input type="url" id="cover" style={submitStyle}></input>
            {isSubmitFail && <p style={{ color: 'red' }}>{isSubmitFail}</p>}
            {isSubmitSuccess && <p style={{ color: 'green' }}>{isSubmitSuccess}</p>}
            <button className="btn btn-primary"
                id="form_submit"
                style={submitStyle}
                type="submit"
                // onClick={savePost}
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
    )
}

export default Form_post