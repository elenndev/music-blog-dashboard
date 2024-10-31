import { useEffect, useState } from "react"
import './components/static/Dashboard.css'
import AllPosts from "../AllPosts/AllPosts"
import Header from '../../components/Header.tsx';
import Footer from '../../components/Footer.tsx';
import { DashboardProvider } from "./components/Context_Dashboard"
import Form_post from "./components/Form_post"
import Set_FeaturedAlbum from "./components/Set_FeaturedAlbum"
import Iframe from "../../components/EmbedPlaylist"
import supabase from "../../components/static/auth"
import submitBlogInfo from "./components/static/submitBlogInfo"

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../components/static/themes.js";
import GlobalTheme from "../../components/static/globals.js";


const Dashboard = () => {
    const style: React.CSSProperties = {
        width: '100%',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
    const [postId, setId] = useState(0)
    const handleButtonEdit = (id: number) => {setId(id)}

    const [featuredPlaylist, setFeaturedPlaylist] = useState<string | null>('3AqqJn20LczJtoaHjVLipe?utm_source=generator')
    const getFeaturedPlaylist = async()=>{
        const {data} = await supabase.from("blog-saves").select('*').eq("info_name","featured_playlist")
        if (data && data.length > 0){
            setFeaturedPlaylist(data[0].text_value)
        } else {
            setFeaturedPlaylist("Playlist não definida")
        }

    
    }
    function handleSubmitPlaylist(event: React.FormEvent){
        submitBlogInfo("featured playlist",event, null)
        getFeaturedPlaylist()
    }

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark")
    const updateStorageChange = () => {
        const currentTheme = localStorage.getItem("theme");
        setTheme(currentTheme || "dark");
    };
    
    const handleChangeTheme = (newTheme: string) => {
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
    }

    useEffect(() => {
        window.addEventListener("storage", (event) => {
            if (event.key === "theme") {
                updateStorageChange();
            }
        });
        updateStorageChange()

        getFeaturedPlaylist()
    }, [])

    return (
        <>
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalTheme />
            <Header onChangeTheme={handleChangeTheme}/>
            <main style={style}>
                <DashboardProvider>
                    <Set_FeaturedAlbum />
                    <div className="featured-playlist">
                        <p className="container-header">Definir playlist em destaque</p>
                        <form onSubmit={handleSubmitPlaylist}>
                            <label>Informe o link da sua playlist:</label>
                            <input type="url" name="playlist-link" className="playlist-link" placeholder="Link da playlist"></input>
                            <button type="submit" className="btn btn-primary">Enviar</button>
                        </form>
                        <span className="see-playlist">
                            <p>Playlist em destaque atual</p>
                            {featuredPlaylist?
                                <Iframe playlist={featuredPlaylist}/>
                            : <p>Carregando playlist</p>}
                        </span>
                    </div>
                    <p className="container-header post-form">Criar uma nova publicação</p>
                    <Form_post post_id={postId} />
                    <AllPosts
                        isDashboard={true}
                        functionEdit={handleButtonEdit} />
                </DashboardProvider>
            </main>
            <Footer/>
        </ThemeProvider>
        </>
    )
}

export default Dashboard

