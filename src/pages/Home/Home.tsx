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
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        check_path()
    }, [])

    return(
        
        <>
            <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalTheme />
            <Header/>
            <main id="main">
                <Container_LatestPosts />
                <Aside />
                <BackToTop/>
            </main>
            <Footer/>
            </ThemeProvider>
        </>
    )
}
;
export default Home;
