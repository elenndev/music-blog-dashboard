function cleanForm(){
    const editor = document.querySelector('.ql-editor')
    let input_cover = document.querySelector('#cover')

    input_cover.value = ""
    editor.innerHTML = ""
}

export default cleanForm