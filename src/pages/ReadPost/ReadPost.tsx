// import { useLocation } from "react-router-dom"
import Post from "../../components/InterfacePost"

import axios from "axios"
import { useEffect, useState } from "react"
import Content_Post from "../../components/Content_Post"
import { useParams } from "react-router-dom"



const ReadPost: React.FC = () => {
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
        <>  
            {post.map((post) => (
                <article key={post.id}>
                    <img src={post.cover}></img>
                    <Content_Post content={post.content}/>
                </article>

            ))}
        </>
    )
}

export default ReadPost