import { useEffect, useState } from "react";
import type Model_Post from "../../../components/InterfacePost"
import getDate from "../../../blog_configs";
import Content_Post from "../../../components/Content_Post";
import Button_PostReadMore from "../../../components/Button_PostReadMore";
import Title_Post from "../../../components/Title_Post";
import { Truncate } from "@re-dev/react-truncate";
import { Link } from "react-router-dom";
import supabase from "../../../components/static/supabaseauth"


const Post: React.FC<{ post: Model_Post }> = ({ post }) => {
    const date = getDate(post.created_at)
    return(
        <div className="post">
            <div className="post_info">
                <p className="post_info_date">{date.dateMonth} | {date.dateDay}</p>
                <Title_Post title={post.title}/>
            </div>
            <img alt={post.cover_description} src={post.cover}></img>
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
    const [posts, setPosts] = useState<Model_Post[]>([])
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
                    <Link to={'/todas-publicacoes'} className="btn btn-secondary all-posts">Todas as publicações</Link>
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