import { createElement } from "react"

function EditPost(id,cover,title,content){
    const editor = document.querySelector('.ql-editor')
    const input_cover = document.querySelector('#cover')
    const h1 = document.createElement('h1')

    h1.textContent = title
    const post_title = h1.outerHTML

    editor.innerHTML = post_title + content
    input_cover.value = cover
}

export default EditPost