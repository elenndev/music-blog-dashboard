import { useContext } from "react"
import cleanForm from "./cleanForm"
import exitEditMode from "./exitEditMode"
import { EditModeContext } from "../Context_EditMode"
import supabase from '../../../../components/static/auth';

const { user, error: userError } = await supabase.auth.getUser();
if (userError) {
    console.error('Erro ao obter usuário:', userError);
    return;
}

const SubmitForm = async (event, reqType, postId, context) =>{
    event.preventDefault()
    const form_submit = document.querySelector('#form_submit')
    const cover = document.querySelector('#cover').value
    const editor = document.querySelector('div.ql-editor')
    const h1 = editor.querySelector("h1")
    let reqURL = null
    let method = null
    let type = reqType.reqType
    let id = postId.id 

    const {setEditMode} = context


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
        let result = null
        const title = editor.querySelector("h1").innerHTML
        const remove_h1 = editor.querySelector("h1")
        remove_h1.remove()
        const content = editor.innerHTML
        console.log(typeof content)
        let data = {
            cover: cover,
            title: title,
            content: content,
            user_id: user.id
        }

        // Verificar auth e define method
        if (user){
            if (type == 'post'){
                const {error} = await supabase.from('posts').insert(data)
                console.log('é post')
                if (error){
                    console.log('Erro ao fazer o post', error)
                    return
                }
            } else if(type == 'put'){
                const {error} = await supabase.from('posts').update(data).eq("id", data.id)
                console.log("é put")
                if (error){
                    console.log('Erro ao fazer o update', error)
                    return
                }
            }

        } else {
            console.log('usuário não autenticado')
        }
        // Submit form
        console.log("a data é ", data)
        console.log('a resposta da req supabase: ', error)

        // fetch(reqURL, {
        //     method: method,
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then(response => {
        //     console.log("response status:", response.status)
        //     if (!response.ok){
        //         throw new Error('Network response was not okay')
        //     }
        //     result = response.status
        //     if (response.sttus == 200){
        //         cleanForm()

        //     }
        //     console.log("no js, o result é:",result, "e o response.status direto é: ", response.status)
        //     return result
        // })
        // .then(data => {
        //     setEditMode(false)
        //     console.log('sucess:', data)
        //     return result
        // }).catch((error) => {
        //     console.log('Fetch error:', error)
        // })
    
    }


export default SubmitForm