import AllPosts from "../AllPosts/AllPosts"
import Form_pots from "./components/Form_post"

const Dashboard = () => {
    return(
        <>
            <Form_pots/>
            <AllPosts isDashboard={true}/>
        </>
    )
}

export default Dashboard
