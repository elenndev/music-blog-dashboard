import { useEffect, useState } from "react";
import check_path from "../..";
import getChangeTheme from "./static/changeTheme";

const Header = ({ onChangeTheme }: { onChangeTheme: (newTheme: string) => void }) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");


    const [isChecked, setIsChecked] = useState(false)
    const handleChangeTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
        // primeiramente atualiza o localStorage
        console.log("foi chamado")
        const getUserTheme = localStorage.getItem('theme')
        console.log("chamado com o tema: ", getUserTheme)
        if (getUserTheme) {
            setTheme(getUserTheme)
        }

        if (getUserTheme === 'light' && !event === null) {
            setIsChecked(event.target.checked)
        }

        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme)
        // atualiza no elemento pai
        onChangeTheme(newTheme)
    }

    useEffect(() => {
        check_path()
        // getChangeTheme(theme, handleChangeTheme)
        handleChangeTheme(null)
    }, [])


    return (
        <header id="header">
            <nav><a href="/" className="home-link"><p>inicio</p></a><a href="/sobre-mim" className="aboutMe-link"><p>sobre</p></a></nav>
            {/* <button onClick={handleChangeTheme}>Mudar Tema</button> */}
            <input className="input" onChange={handleChangeTheme} type="checkbox" name="darkmode" id="dark-mode" checked={isChecked} />
            <label htmlFor="dark-mode" className="label">
                <span className="circle"></span>
            </label>
        </header>
    )
}

export default Header