import './components/static/about_me.css'
import profileIcon from "./components/midia/profile-icon.jpg"
const AboutMe = () => {
    return(
        <div className="container about-me">
            <img className='profile' src={profileIcon}></img>
            <h1>Boas vindas ao meu blog !</h1>
            <p>Criei este blog com o intuito de falar sobre música e principalmente colocar em prática os meus estudos em programação enquanto o desenvolvo, além de também conhecer pessoas de ambas as áreas para se conectar! Se você quiser, fique à vontade para puxar um papo seja sobre música, programação, suas opiniões, sugestões etc.</p>
        </div>
    )
}
export default AboutMe