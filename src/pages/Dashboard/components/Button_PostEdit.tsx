import FunctionGetId from "./Type_FunctionGetId";
import Post from "../../../components/InterfacePost";
import EditPost from "../static/editPost";

const Button_PostEdit: React.FC<{post: Post, editPost?: FunctionGetId}> = ({post, editPost}) => {
    const Edit = () =>{
        EditPost(post.id,post.cover,post.title,post.content)

        if (editPost){
            editPost(post.id)
        }

    }
    return(
        <button type="button" className="btn btn-secundary" onClick={Edit}>Editar</button>
    )
}


export default Button_PostEdit