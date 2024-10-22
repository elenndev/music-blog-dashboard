import FeaturedAlbum from "./Container_FeaturedAlbum"

// Midia
import profileIcon from "./img/serial-experiments-lain-750.jpg"
import spotifySvg from "./img/Spotify.svg"
import lastFmSvg from "./img/LastFM.svg"
import musicBoardSvg from "./img/musicBoard.svg"


const Aside = () => {
    return(
        <aside>
            <div className="container profile">
                <a href="#" target="_blank" rel="noopener norferrer"><img className="profile-icon" src={profileIcon}></img></a>
                <a href="https://open.spotify.com/user/mwlwzw8omn3hdq27f8w9oa6fw?si=4tkY8qpMSTuWqHew85IarQ" target="_blank" rel="noopener norferrer"><img className="social-icons spotify" src={spotifySvg}></img></a>
                <a href="https://www.last.fm/user/GOTHMIKASA" target="_blank" rel="noopener norferrer"><img className="social-icons lastFm" src={lastFmSvg}></img></a>
                <a href="https://musicboard.app/mitskicomunista?rel=copy" target="_blank" rel="noopener norferrer"><img className="social-icons musicBoardSvg" src={musicBoardSvg}></img></a>
            </div>
            <FeaturedAlbum/>
            <div className="container featured_playlist">
                <h3>Playlist em destaque</h3>
                <iframe style={{borderRadius: '12px'}} src="https://open.spotify.com/embed/playlist/0snxfBB1S70xJTSxHpoJOi?utm_source=generator&theme=0" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
        </aside>
    )
}

export default Aside