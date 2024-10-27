import { useEffect, useState } from "react"
import SVG_lastFm from "../../../components/SVG_lastFm"
import SVG_spotify from "../../../components/SVG_spotify"
import FeaturedAlbum from "./Container_FeaturedAlbum"

// Images
import profileIcon from "./img/profile-icon.jpg"
import musicboardLogo from "../../../components/musicboard.png"


const Aside = () => {
    const [featuredPlaylist, setFeaturedPlaylist] = useState<string>('3AqqJn20LczJtoaHjVLipe?utm_source=generator')
    useEffect(() => {
        const link = localStorage.getItem('featuredPlaylist')
        if (link){
            setFeaturedPlaylist(link)
        }
    }, [])

    const Iframe = () => {
        return(
            <iframe
                        style={{ borderRadius: '12px' }}
                        src={featuredPlaylist}
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>
        )
    }
    return (
        <aside>
            <div className="container profile">
                <a href="/sobre-mim" className="profile-icon"><img src={profileIcon}></img></a>

                <span>
                    <a href="https://open.spotify.com/user/mwlwzw8omn3hdq27f8w9oa6fw?si=4tkY8qpMSTuWqHew85IarQ" target="_blank" rel="noopener norferrer" className="social-icons spotify"><SVG_spotify /></a>
                    <a href="https://www.last.fm/user/GOTHMIKASA" target="_blank" rel="noopener norferrer" className="social-icons lastFm"><SVG_lastFm /></a>
                    <a href="https://musicboard.app/mitskidasilva?rel=options" target="_blank" rel="noopener norferrer" className="social-icons musicBoard"><img src={musicboardLogo}></img></a>
                </span>
            </div>
            <div className="container album_week">
                <h3 className="container-header">Albúm da semana</h3>
                <FeaturedAlbum />
            </div>
            <div className="container featured_playlist">
                <h3>Playlist em destaque</h3>
                {featuredPlaylist &&
                    <Iframe/>
                }
            </div>
        </aside>
    )
}

export default Aside