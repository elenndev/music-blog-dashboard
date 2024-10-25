import FunctionGetId from "./Type_FunctionGetId";
import Post from "../../../components/InterfacePost";
import EditPost from "./static/editPost";
import { DashboardContext} from "./Context_Dashboard";
import { useContext } from "react";

const Button_PostEdit: React.FC<{post: Post, editPost?: FunctionGetId}> = ({post, editPost}) => {
    // const [onEdit, setOnEdit] = useState(false)
    const context = useContext(DashboardContext)
    if (!context) {
        // Trate o caso em que o contexto não é encontrado
        console.error("DashboardContext não está disponível.");
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