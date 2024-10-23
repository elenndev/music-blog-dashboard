import SVG_lastFm from "../../../components/SVG_lastFm"
import SVG_musicBoard from "../../../components/SVG_musicBoard"
import SVG_spotify from "../../../components/SVG_spotify"
import FeaturedAlbum from "./Container_FeaturedAlbum"

// Midia
import profileIcon from "./img/profile-icon.jpg"


const Aside = () => {
    return(
        <aside>
            <div className="container profile">
                <a href="/sobre-mim" className="profile-icon"><img  src={profileIcon}></img></a>
                    
                <span>
                    <a href="https://open.spotify.com/user/mwlwzw8omn3hdq27f8w9oa6fw?si=4tkY8qpMSTuWqHew85IarQ" target="_blank" rel="noopener norferrer" className="social-icons spotify"><SVG_spotify/></a>
                    <a href="https://www.last.fm/user/GOTHMIKASA" target="_blank" rel="noopener norferrer" className="social-icons lastFm"><SVG_lastFm/></a>
                    <a href="https://musicboard.app/mitskicomunista?rel=copy" target="_blank" rel="noopener norferrer" className="social-icons musicBoard"><SVG_musicBoard/></a>
                </span>
            </div>
            <div className="container album_week">
                <h3 className="container-header">Albúm da semana</h3>
                <FeaturedAlbum/>
            </div>
            <div className="container featured_playlist">
                <h3>Playlist em destaque</h3>
                <div id="embed-iframe"></div>
            </div>
        </aside>
    )
}

export default Aside