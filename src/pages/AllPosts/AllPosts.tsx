import React, { useContext, useEffect, useState } from 'react';
import CardPost from './components/CardPost.tsx';
import './components/static/All_posts.css';
import Button_SignOut from '../Dashboard/components/Button_SignOut.tsx';
import FunctionGetId from '../Dashboard/components/Type_FunctionGetId.tsx';
import check_path from '../../../index.js'
import { DashboardContext } from '../Dashboard/components/Context_Dashboard.tsx';
import supabase from '../../components/static/auth.js';
import Model_Post from '../../components/InterfacePost.tsx';


const AllPosts: React.FC<{isDashboard?: boolean,
functionEdit?: FunctionGetId
onEdit?: boolean    
}> = ({isDashboard = false, functionEdit}) => {
    const [posts, setPosts] = useState<Model_Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const context = useContext(DashboardContext)
    if (!context){
        throw new Error("DashboardContext não está disponível.");
    }

    const getData = async () => {
        const {data} = await supabase.from("posts").select()
        if (data){
            setPosts(data);   
            setLoading(false);
        } else if(!data){
            setError("Publicações não disponíveis")
        }
    };
    useEffect(() => {
        getData();
        check_path()
    }, []);


    const {submittedPost, setOnSubmittedPost, deletePost, setOnDeletePost} = context
    useEffect(() => {
        if (submittedPost){
            getData()
            setOnSubmittedPost(false)
        }
    }, [submittedPost])

    useEffect(() => {
        if (deletePost){
            getData()
            setOnDeletePost(false)
        }
    }, [deletePost])

    if (error) {
        return <p>{error}</p>;
    }

    if (loading){
        return <p>Carregando publicações</p>
    }


    const Container_AllPosts = () =>{
        return(
            <div className='container all-posts'>
            <div className='container_header'>
                <h2>Todos as publicações</h2>
                {isDashboard && <Button_SignOut/>}
            </div>
            {loading && <p>Carregando publicações...</p>}
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
        )
    }

    return (
        <>
            {isDashboard ? (
                <>
                    <Container_AllPosts/>
                </>
            ) : (
                <main id='main_all-posts'><Container_AllPosts /></main>
            )}
        </>
    );
};


export default AllPosts;


