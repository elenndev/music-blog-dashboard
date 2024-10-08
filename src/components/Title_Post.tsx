import DOMPurify from "dompurify"

const Title_Post: React.FC<{title: string}> = ({title}) => {
    const TitleString = title
    const TitleHtml = DOMPurify.sanitize(TitleString)


    return(
        <h1 className="post_title" dangerouslySetInnerHTML={{__html: TitleHtml}}></h1>
    )
}


export default Title_Post