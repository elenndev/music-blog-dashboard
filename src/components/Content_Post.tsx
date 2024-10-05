import DOMPurify from "dompurify"

const Content_Post: React.FC<{content: string}> = ({content}) => {
    const contentString = content
    const contentHtml = DOMPurify.sanitize(contentString)


    return(
        <div className="post_content" dangerouslySetInnerHTML={{__html: contentHtml}}></div>
    )
}


export default Content_Post