import { useState } from "react"
import AllPosts from "../AllPosts/AllPosts"
import { EditModeProvider } from "./components/Context_EditMode"
import Form_post from "./components/Form_post"
import Set_FeaturedAlbum from "./components/Set_FeaturedAlbum"



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
        setId(id)
    }


    return (
        <main style={style}>
            <EditModeProvider>
                <Form_post post_id={postId} />
                <Set_FeaturedAlbum />
                <form id="setFeaturedPlaylist">
                    <label>Informe o link da sua playlist</label>
                    <input type="url" name="playlist-link" className="playlist-link"></input>
                    <button type="submit">Enviar</button>
                </form>
                <AllPosts
                    isDashboard={true}
                    functionEdit={handleButtonEdit} />
            </EditModeProvider>
        </main>
    )
}

export default Dashboard
