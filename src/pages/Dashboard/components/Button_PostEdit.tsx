import DefaultFunction from "../../../components/Interface_Function";
import Post from "../../../components/InterfacePost";
import EditPost from "../static/editPost";

const Button_PostEdit: React.FC<{post: Post, editPost?: DefaultFunction}> = ({post, editPost}) => {
    const Edit = () =>{
        EditPost(post.id,post.cover,post.title,post.content)

        if (editPost){
            editPost()
        }

    }
    return(
        <button type="button" className="btn btn-secundary" onClick={Edit}>Editar</button>
    )
}


export default Button_PostEdit