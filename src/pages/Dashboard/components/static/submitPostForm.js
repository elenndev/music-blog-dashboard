import { useContext } from "react"
import cleanForm from "./cleanForm"
import exitEditMode from "./exitEditMode"
import { DashboardContext } from "../Context_Dashboard"
import axios from 'axios';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;


const SubmitForm = async (event, reqType, postId, context) =>{
    event.preventDefault()
    const form_submit = document.querySelector('#form_submit')
    const cover = document.querySelector('#cover').value
    const cover_description = document.querySelector("#cover_description").value
    const editor = document.querySelector('div.ql-editor')
    const h1 = editor.querySelector("h1")
    let reqURL = null
    let method = null
    let type = reqType.reqType
    let id = postId.id
    
    const {setEditMode} = context

        if (!(cover.endsWith('webp'))){
            alert('Imagem com formato inválido, por favor tente usar uma imagem de formato webp')
            return
        } else if (cover_description.length<5){
            alert('Por favor preencha corretamente o campo da descrição da capa da publicação')
            return
        }

        if (editor.querySelectorAll("h1").length<1){
            alert('Seu post deve possuir um título! (h1)')
            return
        } else if (!/[^\s]/.test(h1.textContent.trim())){
            alert('Seu titulo está vazio')
            return
        } else if (editor.querySelectorAll('h1').length>1){
            const header = document.querySelectorAll('h1')

            const removeTag = Array.from(header)
            removeTag.shift()

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
        const content = editor.innerHTML
        let data = {
            cover: cover,
            cover_description: cover_description,
            title: title,
            content: content,
            created_at: new Date()
        }

        // Verificar auth e define method
        if (type == 'post'){
            const response = await axios.post(`${SERVER_URL}/create-post`, data)
            if(!response.data){
                return false
            }
            cleanForm()
            return 200
        } else if(type == 'put'){
            const response = await axios.put(`${SERVER_URL}/update-post`, data, {
                params: {
                    get_id: id
                }
            })
            if (!response.data) { return false}
            cleanForm()
            return 200
        }

    
    }


export default SubmitForm