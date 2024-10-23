import React, { useContext, useEffect, useState } from 'react';
import CardPost from './components/CardPost.tsx';
import '../AllPosts/All_posts.css';
import axios from 'axios';
import Button_SignOut from '../Dashboard/components/Button_SignOut.tsx';
import FunctionGetId from '../Dashboard/components/Type_FunctionGetId.tsx';
import { EditModeContext } from '../Dashboard/components/Context_EditMode.tsx';
import supabase from '../../components/static/auth.js';

interface Post {
    id: number; // Definindo o tipo para os posts, um modelo
    cover: string;
    title: string;
    content: string;
    created_at: string;
}

const AllPosts: React.FC<{isDashboard?: boolean,
functionEdit?: FunctionGetId
onEdit?: boolean    
}> = ({isDashboard = false, functionEdit}) => {
    const [posts, setPosts] = useState<Post[]>([]); // Define o estado como um array de Post
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Define o tipo do erro
    //CONTEXTO
    const context = useContext(EditModeContext)
    if (!context){
        throw new Error("EditModeContext não está disponível.");
    }


    const getData = async () => {
        const {data} = await supabase.from("posts").select()
        if (data){
            setPosts(data);   
            setLoading(false);                 // Indica que o carregamento foi concluído
        } 
    };
    useEffect(() => {
        getData();

    }, []);


    const {submittedPost, setOnSubmittedPost} = context
    useEffect(() => {
        if (submittedPost){
            console.log('submited post agora é atualizar o all posts')
            getData()
            setOnSubmittedPost(false)
        }
    }, [submittedPost])


    if (error) {
        return <p>{error}</p>;
    }

    if (loading){
        return <p>Carregando publicações</p>
    }

    return (
        <div className='container all-posts'>
            <div className='container_header'>
                <h2>Todos as publicações</h2>
                {isDashboard && <Button_SignOut/>}
            </div>
            {loading && <p>Carregando publicações...</p>}
            {/* div que guarda de fato todos os posts */}
            <div className='card-container'>
                {posts.map((post) => (
                    <CardPost key={post.id}
                        post = {post}
                        isDashboard = {isDashboard}
                        functionEdit={functionEdit}
                    />
                ))}
            </div>
            
        </div>
    );
};


export default AllPosts;
