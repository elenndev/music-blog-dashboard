const home = document.querySelector('a.home')
const more = document.querySelector('a.more')
if (window.location.pathname == "/") {
    home.classList.add('current-page')
}

const SubmitForm = (event) =>{
    event.preventDefault()
    const form_submit = document.querySelector('#form_submit')
    const cover = document.querySelector('#cover').value
    const editor = document.querySelector('div.ql-editor')
    const h1 = editor.querySelector("h1")



    //Condições
        if (!(cover.endsWith('jpg') || cover.endsWith('jpeg') || cover.endsWith('png'))){
            alert('Imagem com formato inválido, por favor tente usar uma imagem diferente')
            return
        }

        if (editor.querySelectorAll("h1").length<1){
            console.log('Nenhum elemento')
            alert('Seu post deve possuir um título! (h1)')
            return
        } else if (!/[^\s]/.test(h1.textContent.trim())){
            alert('Seu titulo está vazio')
            return
        } else if (editor.querySelectorAll('h1').length>1){
            console.log("mais de um h1")
            const header = document.querySelectorAll('h1')

            const removeTag = Array.from(header)
            removeTag.shift() //remove o primeiro item

            removeTag.forEach(function(changeTag){
                const h2 = document.createElement('h2')
                h2.textContent = changeTag.textContent
                changeTag.replaceWith(h2)
            })
            return
        }

        //Formatar conteudos para o submit
        const title = editor.querySelector("h1").outerHTML
        const content = editor.innerHTML
        console.log(typeof content)
        const data = {
            cover: cover,
            title: title,
            content: content,
        }

        // Fazer o Post
        console.log("a data é ", data)
        fetch('https://music-archive-epi.onrender.com/create-new-post/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
.then(response => {
    console.log("response status:", response.status)
    if (!response.ok){
        throw new Error('Network response was not okay')
    }
    return response.json()
})
.then(data => {
    console.log('sucess:', data)
    // alert(data.mensagem)
}).catch((error) => {
    console.log('Fetch error:', error)
})}

export default SubmitForm