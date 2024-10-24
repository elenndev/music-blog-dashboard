import FunctionGetId from "./Type_FunctionGetId";
import Post from "../../../components/InterfacePost";
import EditPost from "./static/editPost";
import { EditModeContext} from "../components//Context_EditMode";
import { useContext } from "react";

const Button_PostEdit: React.FC<{post: Post, editPost?: FunctionGetId}> = ({post, editPost}) => {
    // const [onEdit, setOnEdit] = useState(false)
    const context = useContext(EditModeContext)
    if (!context) {
        // Trate o caso em que o contexto não é encontrado
        console.error("EditModeContext não está disponível.");
        return null;
    }
    const { onEdit, setEditMode } = context;
    function Edit(){
        setEditMode(true)
        console.log('novo valor', onEdit)
        EditPost(post.id,post.cover,post.title,post.content)

        if (editPost){
            editPost(post.id)
        }

    }
    return(
        <button type="button" className="btn btn-secundary" onClick={Edit}><p>Editar</p></button>
    )
}


export default Button_PostEdit