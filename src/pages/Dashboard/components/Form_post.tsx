import Editor from "./Editor"
import SubmitForm from "../../../../index"

const Form_post = () => {
    return(
        <form onSubmit={SubmitForm}>
            <Editor />
            <input type="url" id="cover"></input>
            <button className="btn btn-primary" id="form_submit" type="submit">Enviar</button>
        </form>
    )
}

export default Form_post