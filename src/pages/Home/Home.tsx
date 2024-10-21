import Container_LatestPosts from "./components/Container_LatestPosts";
import '../Home/components/static/Home.css'
import Aside from "./components/Aside";
const Home = () => {
    
    return(
        <main id="main">
            <Container_LatestPosts />
            <Aside />
        </main>
    )
}
;
export default Home;