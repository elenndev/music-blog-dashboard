import { useEffect, useState } from "react"



const Aside = () => {
    const [featuredAlbum, setFeaturedAlbum] = useState<string>('')
    //pegar localStorage quando o elemento é renderizado
    useEffect(() => {
        const featuredAlbumId = localStorage.getItem('featureAlbumId')
        if(!featuredAlbumId){
            setFeaturedAlbum(value)
        } else{
            //se local storage ainda nao existe
            localStorage.setItem('featuredAlbumId','null')
        }
    },[])
    return(
        <aside>
            <div className="container profile">
                <h3>Albúm profile</h3>
                <span>conteudo aqui</span>
            </div>
            <div className="container album-week">
                <h3>Albúm da semana</h3>
                <span>conteudo aqui</span>
            </div>
            <div className="container featured_playlist">
                <h3>Playlist em destaque</h3>
                <span>Conteúdo aqui</span>
            </div>
        </aside>
    )
}

export default Aside