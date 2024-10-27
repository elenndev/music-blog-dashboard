import { useEffect, useState } from "react";
import getDate from "../../../blog_configs";
import Content_Post from "../../../components/Content_Post";
import Button_PostReadMore from "../../../components/Button_PostReadMore";
import Title_Post from "../../../components/Title_Post";
import { Truncate } from "@re-dev/react-truncate";
import { Link } from "react-router-dom";
import supabase from "../../../components/static/auth.js"


interface Post {
    id: number; 
    cover: string;
    title: string;
    content: string;
    created_at: string;
}

const Post: React.FC<{ post: Post }> = ({ post }) => {
    const date = getDate(post.created_at)
    return(
        <div className="post">
            <div className="post_info">
                <p className="post_info_date">{date.dateMonth} | {date.dateDay}</p>
                <Title_Post title={post.title}/>
            </div>
            <img src={post.cover}></img>
            <Truncate
                lines={10}
                ellipsis={<>...</>}>
                    {<Content_Post content={post.content} />}
            </Truncate>
            <span className="buttons-area">
                <Button_PostReadMore id={post.id} />
                <hr></hr>
            </span>
        </div>
    )
}

const LatestPosts = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const getData = async () => {
            const {data} = await supabase.from('posts').select()
            
            if (data){
                setPosts(data)
            } if (!data){
                setError('Erro ao buscar publicações')
            }
            setLoading(false)
        }
        getData()
    }, [])

    if (error) {
        return(error)
    }

    return(
        <>
            <section className="container latest-posts">
                <div className="container_header">
                    <h2>Últimas publicações</h2>
                    <Link to={'/todas-publicacoes'} className="btn btn-secundary all-posts">Todas as publicações</Link>
                </div>
                {loading && <p>Carregando publicações...</p>}
                {posts.map((post)=>(
                    <Post key={post.id} post = {post}/>
                ))}
            </section>
        </>
    )
}

export default LatestPosts