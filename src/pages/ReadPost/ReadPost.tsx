import Post from "../../components/InterfacePost"

import axios from "axios"
import { useEffect, useState } from "react"
import Content_Post from "../../components/Content_Post"
import { Link, useParams } from "react-router-dom"
import './ReadPost.css'


const ReadPost: React.FC = () => {
    const ButtonStyle = {
        'width': 'fit-content',
        'padding': '5px 30px'
    }
    const {id} = useParams<{id: string}>()
    const [post, setPost] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    console.log(id)

    useEffect(() => {
        axios.get(`https://music-archive-epi.onrender.com/get-post/${id}`)
        .then(response => {
            setPost(response.data);
            setLoading(false);
        }).catch(error => {
                console.log(error)
            })
    }, [id])

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
                    <Link to={'/all-posts'} className="btn btn-secundary" style={ButtonStyle}>Voltar</Link>
                </article>

            ))}
        </main>
    )
}

export default ReadPost