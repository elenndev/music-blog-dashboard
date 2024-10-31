import { useState } from "react";

const Header = () => {
    const [theme, setTheme] = useState("light");



    return (
        <header><nav><a href="/" className="home-link"><p>inicio</p></a><a href="/sobre-mim" className="aboutMe-link"><p>sobre</p></a></nav><button
        >Mudar Tema</button>
        </header>
    )
}

export default Header