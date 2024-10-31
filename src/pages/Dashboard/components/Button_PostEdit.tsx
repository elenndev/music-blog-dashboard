import FunctionGetId from "./Type_FunctionGetId";
import Post from "../../../components/InterfacePost";
import EditPost from "./static/editPost";
import { DashboardContext} from "./Context_Dashboard";
import { useContext } from "react";

const Button_PostEdit: React.FC<{post: Post, editPost?: FunctionGetId}> = ({post, editPost}) => {
    const context = useContext(DashboardContext)
    if (!context) {
        console.error("DashboardContext não está disponível.");
        return null;
    }
    const { setEditMode } = context;
    function Edit(){
        setEditMode(true)
        EditPost(post.id,post.cover,post.title,post.content)

        if (editPost){
            editPost(post.id)}
    }
    return(
        <button type="button" className="btn btn-secondary" onClick={Edit}><p>Editar</p></button>
    )
}


export default Button_PostEdit