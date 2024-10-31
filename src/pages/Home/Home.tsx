import Container_LatestPosts from "./components/Container_LatestPosts";
import '../Home/components/static/Home.css'
import Aside from "./components/Aside";
import BackToTop from "../../components/Button_BackToTop";
import Header from '../../components/Header.tsx';
import Footer from '../../components/Footer.tsx';
import { useEffect, useState } from "react";
import check_path from '../../../index.js'

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../components/static/themes.js";
import GlobalTheme from "../../components/static/globals.js";
import styled from "styled-components";

const Home = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark")
    
    // vai ser chamado uma vez que a pagina é carregada e ao mudar
    // em outras abas tambem
    const updateStorageChange = () => {
        const currentTheme = localStorage.getItem("theme");
        setTheme(currentTheme || "dark");
    };
    
    //callback que vai ser passado pro header
    const handleChangeTheme = (newTheme: string) => {
        setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
    }
    
    
    useEffect(() => {
        // check_path()
        // Adiciona o evento de escuta para mudanças no localStorage pra abas
        window.addEventListener("storage", (event) => {
            if (event.key === "theme") {
                updateStorageChange();
            }
        });

        updateStorageChange()

    }, [])

    return (

        <>
            <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
                <GlobalTheme />
                <Header onChangeTheme={handleChangeTheme} />
                <main id="main">
                    <Container_LatestPosts />
                    <Aside />
                    <BackToTop />
                </main>
                <Footer />
            </ThemeProvider>
        </>
    )
}
    ;
export default Home;
