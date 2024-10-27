import Container_LatestPosts from "./components/Container_LatestPosts";
import '../Home/components/static/Home.css'
import Aside from "./components/Aside";
import BackToTop from "../../components/Button_BackToTop";
const Home = () => {
    
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