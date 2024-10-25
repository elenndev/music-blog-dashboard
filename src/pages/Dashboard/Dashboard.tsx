import { useEffect, useState } from "react"
import './components/static/Dashboard.css'
import AllPosts from "../AllPosts/AllPosts"
import { EditModeProvider } from "./components/Context_EditMode"
import Form_post from "./components/Form_post"
import Set_FeaturedAlbum from "./components/Set_FeaturedAlbum"
import submitFeaturedPlaylist from "./components/static/submiteFeaturedPlaylist"
import Iframe from "../../components/EmbedPlaylist"



const Dashboard = () => {
    const style: React.CSSProperties = {
        width: '100%',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
    const [postId, setId] = useState(0)
    const handleButtonEdit = (id: number) => {
        setId(id)}

    const [featuredPlaylist, setFeaturedPlaylist] = useState<string>('3AqqJn20LczJtoaHjVLipe?utm_source=generator')
    const getFeaturedPlaylist = async()=>{
        const link = localStorage.getItem('featuredPlaylist')
        if (link){
            console.log('pegou o localStorage', link)
            setFeaturedPlaylist(link)
        }}

    function handleSubmitPlaylist(event: React.FormEvent){
        submitFeaturedPlaylist(event)
        getFeaturedPlaylist()
    }


    // Inicialização
    useEffect(() => {
        getFeaturedPlaylist()
    }, [])

    return (
        <main style={style}>
            <EditModeProvider>
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
            </EditModeProvider>
        </main>
    )
}

export default Dashboard
