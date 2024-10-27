import './components/static/about_me.css'
import SVG_spotify from '../../components/SVG_spotify'
import SVG_lastFm from '../../components/SVG_lastFm'
import SVG_email from '../../components/SVG_email'
import SVG_github from '../../components/SVG_github'

// Images
import profileIcon from "./components/midia/profile-icon.jpg"
import musicboardLogo from "../../components/musicboard.png"

const AboutMe = () => {
    return(
        <div className="container about-me">
            <img className='profile' src={profileIcon}></img>
            <h1>Boas vindas ao meu blog !</h1>
            <p className='info'>Criei este blog com o intuito de falar sobre música e principalmente colocar em prática os meus estudos em programação enquanto o desenvolvo, além de também conhecer pessoas de ambas as áreas para se conectar! Se você quiser, fique à vontade para puxar um papo seja sobre música, programação, suas opiniões, sugestões etc. <br></br>Mais informações nos links abaixo:</p>
            <span className='links'>
                <a href='mailto:elen.damares774@gmail.com' target="_blank" rel="noopener norferrer" className='btn btn-primary transparent'><SVG_email/> Email</a>
                <a href='https://github.com/elenndev' target="_blank" rel="noopener norferrer" className='btn btn-primary transparent'><SVG_github/> GitHub</a>
                <a href="https://open.spotify.com/user/mwlwzw8omn3hdq27f8w9oa6fw?si=4tkY8qpMSTuWqHew85IarQ" target="_blank" rel="noopener norferrer" className='btn btn-primary transparent'><SVG_spotify/>Spotify</a>
                <a className='btn btn-primary transparent'><img className='musicboard' src={musicboardLogo}></img>MusicBoard</a>
                <a href="https://www.last.fm/user/GOTHMIKASA" target="_blank" rel="noopener norferrer" className='btn btn-primary transparent'><SVG_lastFm/>LastFm </a>
            </span>
        </div>
    )
}
export default AboutMe