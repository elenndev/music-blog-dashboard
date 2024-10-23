import Post from "../../components/InterfacePost"

import { useEffect, useState } from "react"
import Content_Post from "../../components/Content_Post"
import { Link, useParams } from "react-router-dom"
import './ReadPost.css'
import supabase from "../../components/static/auth"


const ReadPost: React.FC = () => {
    const ButtonStyle = {
        'width': 'fit-content',
        'padding': '5px 30px'
    }
    const {id} = useParams<{id: string}>()
    const [post, setPost] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    console.log(id)

    const getData = async () =>{
        const {data} = await supabase.from("posts").select('*').eq("id",id)
        if (data){
            setPost(data);
            setLoading(false);
        }

    }

    useEffect(() => {
        getData()
    }, [])

    if (loading){
        return <p>Carregando publicação</p>
    }

    return(
        <main>  
            {post.map((post) => (
                <article className="container read-post" key={post.id}>
                    <h1>{post.title}</h1>
                    <img src={post.cover}></img>
                    <Content_Post content={post.content}/>
                    <Link to={'/todas-publicacoes'} className="btn btn-secundary" style={ButtonStyle}>Voltar</Link>
                </article>

            ))}
        </main>
    )
}

export default ReadPost