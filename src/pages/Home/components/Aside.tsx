import FeaturedAlbum from "./Container_FeaturedAlbum"



const Aside = () => {
    return(
        <aside>
            <div className="container profile">
                <img src="/serial-experiments-lain-750.jpg"></img>
                <img className="social-icons" src="/Spotify.svg"></img>
                <img className="social-icons" src="/LastFM.svg"></img>
                <img className="social-icons" src="/musicBoard.svg"></img>
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