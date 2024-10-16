import cleanForm from "./cleanForm"
import exitEditMode from "./exitEditMode"

const SubmitForm = (event, reqType, postId) =>{
    event.preventDefault()
    const form_submit = document.querySelector('#form_submit')
    const cover = document.querySelector('#cover').value
    const editor = document.querySelector('div.ql-editor')
    const h1 = editor.querySelector("h1")
    let reqURL = null
    let method = null
    let type = reqType.reqType
    let id = postId.id 



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
        const title = editor.querySelector("h1").innerHTML
        const remove_h1 = editor.querySelector("h1")
        remove_h1.remove()
        const content = editor.innerHTML
        console.log(typeof content)
        let data = {
            cover: cover,
            title: title,
            content: content,
        }

        // Define method
        if (type == 'post'){
            reqURL = 'http://127.0.0.1:8000/create-new-post/'
            method = 'POST'
            console.log('é post')
        } else if(type == 'put'){
            reqURL = `http://127.0.0.1:8000/update-post/${id}`
            method = 'PUT'
            console.log("é put")
        }
        // Submit form
        console.log("a data é ", data)
        fetch(reqURL, {
            method: method,
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
            cleanForm()
            exitEditMode()
            console.log('sucess:', data)
        }).catch((error) => {
            console.log('Fetch error:', error)
        })}


export default SubmitForm