import Container_LatestPosts from "./components/Container_LatestPosts";
import '../Home/components/static/Home.css'
import Aside from "./components/Aside";
import BackToTop from "../../components/Button_BackToTop";
import { useEffect } from "react";
import check_path from '../../../index.js'

const Home = () => {
    useEffect(() => {
        check_path()
    }, [])

    return(
        <main id="main">
            <Container_LatestPosts />
            <Aside />
            <BackToTop/>
        </main>
    )
}
;
export default Home;
