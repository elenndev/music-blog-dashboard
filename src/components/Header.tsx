import { useEffect, useState } from "react";
import check_path from "../..";

const Header = ({onChangeTheme} : {onChangeTheme: (newTheme: string) => void}) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    const handleChangeTheme = () => {
        // primeiramente atualiza o localStorage
        const getUserTheme = localStorage.getItem('theme')
        if (getUserTheme){
            setTheme(getUserTheme)
        }
        
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme)
        // atualiza no elemento pai
        onChangeTheme(newTheme)
    }
    
    useEffect(() => {
        check_path()
        
    }, [])


    return (
        <header id="header"><nav><a href="/" className="home-link"><p>inicio</p></a><a href="/sobre-mim" className="aboutMe-link"><p>sobre</p></a></nav><button
        onClick={handleChangeTheme}>Mudar Tema</button>
        </header>
    )
}

export default Header