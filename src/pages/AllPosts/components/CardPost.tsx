import getDate from "../../../blog_configs"
import Button_PostReadMore from "../../../components/Button_PostReadMore";
import Content_Post from "../../../components/Content_Post";
import Title_Post from "../../../components/Title_Post";
import Button_PostDelete from "../../Dashboard/components/Button_PostDelete";
import { Truncate } from "@re-dev/react-truncate";
import Button_PostEdit from "../../Dashboard/components/Button_PostEdit";
import FunctionGetId from "../../Dashboard/components/Type_FunctionGetId";
import { DashboardContext} from "../../Dashboard/components/Context_Dashboard";
import { useContext, useEffect } from "react";
interface Post{
    id: number; 
    cover: string;
    title: string;
    content: string;
    created_at: string;
}


const CardPost: React.FC<{ 
post: Post; 
isDashboard: boolean; 
functionEdit?: FunctionGetId;}> = ({ post, isDashboard, functionEdit}) => {
    const date = getDate(post.created_at)
    const context= useContext(DashboardContext)
    if (!context) {
        throw new Error("DashboardContext não está disponível.");
    }

    const { onEdit} = context

    //TESTE: Detectar mudança
    useEffect(() => {
        console.log("Estado de edição mudou:", onEdit);
    }, [onEdit]);
    

    return(
        <div key={post.id} className='post-card'>
            <p className='post-card_date'>{date.dateMonth} | {date.dateDay}</p>
            <span>
                <img src={post.cover}></img>
                <Title_Post title={post.title}/>
                <Truncate
                    lines={3}
                    ellipsis={
                        <>
                            ...
                        </>
                    }
                >
                    {<Content_Post content={post.content} />}
                </Truncate>
                <span className="buttons-area">
                    <Button_PostReadMore id={post.id}/>
                    {isDashboard && <span className="buttons-dashboard">
                        {isDashboard && <Button_PostDelete id={post.id}/>}
                        {isDashboard && !onEdit &&
                        <Button_PostEdit post={post} editPost={functionEdit}/>}
                    </span>}
                </span>
            </span>
        </div>
    )
}


export default CardPost