function cleanForm(){
    const editor = document.querySelector('.ql-editor')
    let input_cover = document.querySelector('#cover')
    let input_coverDescription = document.querySelector('#cover_description')

    editor.innerHTML = ""
    input_cover.value = ""
    input_coverDescription.value = ""
}

export default cleanForm