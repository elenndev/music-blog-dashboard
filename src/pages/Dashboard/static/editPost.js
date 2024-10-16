import { createElement } from "react"

function EditPost(id,cover,title,content){
    const editor = document.querySelector('.ql-editor')
    let input_cover = document.querySelector('#cover')
    let h1 = document.createElement('h1')

    h1.textContent = title
    let post_title = h1.outerHTML

    editor.innerHTML = post_title + content
    input_cover.value = cover

    return(id)
}

export default EditPost