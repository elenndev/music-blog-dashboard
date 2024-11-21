import { useContext, useEffect, useState } from "react"
import './components/static/Dashboard.css'
import AllPosts from "../AllPosts/AllPosts"
import { DashboardContext, DashboardProvider } from "./components/Context_Dashboard"
import Form_post from "./components/Form_post"
import Set_FeaturedAlbum from "./components/Set_FeaturedAlbum"
import Iframe from "../../components/EmbedPlaylist"
import submitBlogInfo from "./components/static/submitBlogInfo"



const Dashboard = () => {
    const style: React.CSSProperties = {
        width: '90%',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: 'solid 1px var(--SecondaryColor)',
        borderRadius: 'var(--borderRadius)',
        margin: '20px'
    }
    // POST EDIT
    const [postId, setId] = useState("")
    const handleButtonEdit = (id: string) => {
        setId(id)
    }



    // PLAYLIST
    const [featuredPlaylist, setFeaturedPlaylist] = useState<string | null>('3AqqJn20LczJtoaHjVLipe?utm_source=generator')
    const getFeaturedPlaylist = ()=>{
            const playlist = localStorage.getItem('featured_playlist')
            if (playlist == null){
                setFeaturedPlaylist("https://open.spotify.com/embed/playlist/6tCKLs0WDeNwEzbCdQSXQn?si=sUyg68daSxy8rA9fLsfQTw")
                return
            }
            setFeaturedPlaylist(playlist)
    }
    function handleSubmitPlaylist(event: React.FormEvent){
        submitBlogInfo("featured playlist",event, null)
        getFeaturedPlaylist()
    }


    //CONTEXT DASHBOARD
    const context = useContext(DashboardContext)
    if (!context){
        throw new Error("DashboardContext não está disponível")}
    const {setOnDrafts} = context

    useEffect(() => {
        setOnDrafts(false)
        getFeaturedPlaylist()
    }, [])

    return (
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
    )
}

export default Dashboard

