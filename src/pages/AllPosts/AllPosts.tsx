import React, { useContext, useEffect, useState } from 'react';
import CardPost from './components/CardPost.tsx';
import './components/static/All_posts.css';
import Button_SignOut from '../Dashboard/components/Button_SignOut.tsx';
import FunctionGetId from '../Dashboard/components/Type_FunctionGetId.tsx';
import { DashboardContext } from '../Dashboard/components/Context_Dashboard.tsx';
import supabase from '../../components/static/auth.js';
import Model_Post from '../../components/InterfacePost.tsx';
import Header from '../../components/Header.tsx';
import Footer from '../../components/Footer.tsx';

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../components/static/themes.js";
import GlobalTheme from "../../components/static/globals.js";


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

    // THEME
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark")
    const updateStorageChange = () =>{
        const currentTheme = localStorage.getItem("theme")
        setTheme(currentTheme || "dark")
    }

    const handleChangeTheme = (newTheme: string) => {
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
    }


    useEffect(() => {
        updateStorageChange()
        getData();
        window.addEventListener("storage", (event)=> {
            if (event.key === "theme"){
                updateStorageChange()
            }
        })
    }, []);
    
    // POSTS
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
        
        return(
            <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalTheme />
                <p>Carregando publicações</p>
            </ThemeProvider>
        ) 
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
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalTheme />
            {isDashboard ? (
                <>
                    <Container_AllPosts/>
                </>
            ) : (
                <>
                    <Header onChangeTheme= {handleChangeTheme}/>
                    <main id='main_all-posts'><Container_AllPosts /></main>
                    <Footer/>
                </>
            )}
        </ThemeProvider>
        </>
    );
};


export default AllPosts;


