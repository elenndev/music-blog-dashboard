import './components/static/about_me.css'
import profileIcon from "./components/midia/profile-icon.jpg"
import SVG_spotify from '../../components/SVG_spotify'
import SVG_lastFm from '../../components/SVG_lastFm'
import SVG_musicBoard from '../../components/SVG_musicBoard'
import SVG_email from '../../components/SVG_email'
const AboutMe = () => {
    return(
        <div className="container about-me">
            <img className='profile' src={profileIcon}></img>
            <h1>Boas vindas ao meu blog !</h1>
            <p className='info'>Criei este blog com o intuito de falar sobre música e principalmente colocar em prática os meus estudos em programação enquanto o desenvolvo, além de também conhecer pessoas de ambas as áreas para se conectar! Se você quiser, fique à vontade para puxar um papo seja sobre música, programação, suas opiniões, sugestões etc. <br></br>Mais informações nos links abaixo:</p>
            <span className='links'>
                <a className='btn btn-primary transparent'><SVG_spotify/>Spotify</a>
                <a className='btn btn-primary transparent'><SVG_musicBoard/>MusicBoard</a>
                <a className='btn btn-primary transparent'><SVG_lastFm/>LastFm </a>
                <a className='btn btn-primary transparent'><SVG_email/> Email</a>
                <a className='btn btn-primary transparent'>GitHub</a>
            </span>
        </div>
    )
}
export default AboutMe