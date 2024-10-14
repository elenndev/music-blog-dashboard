import Post from "../../../components/InterfacePost";
import EditPost from "./postEdit";

const Button_PostEdit: React.FC<{post: Post}> = ({post}) => {
    const Edit = () =>{
        EditPost(post.id,post.cover,post.title,post.content)
    }
    return(
        <button type="button" className="btn btn-secundary" onClick={Edit}>Editar</button>
    )
}


export default Button_PostEdit