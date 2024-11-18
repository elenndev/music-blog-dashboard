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
    // guardar url se é pra postagem mesmo ou rascunho
    let reqURL = null

    let method = null
    let type = reqType.reqType
    let id = postId.id
    
    const {setEditMode, onDrafts} = context

    // Identifica se voce esta enviando/editando uma nova publicação ou salvando rascunho
    // No backend o endpoint para posts e rascunhos são iguais, muda somente o final:
        // Ex "/create-post" ou "/create-draft"  || "/update-post" ou "/update-draft"
    if (onDrafts){
        reqURL = "draft"
    } else {
        reqURL = 'post'
    }

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
        const full_token = localStorage.getItem('token')

        // Verificar auth e define method 
        if (type == 'post'){
            const response = await axios.post(`${SERVER_URL}/create-${reqURL}`, data, {
                headers: {
                    Authorization: `Bearer ${full_token}`
                }
            })
            if(!response.data){
                // substituir por uma verificação de erro compativel com o seu backend
                return false
            }
            cleanForm()
            return 200
        } else if(type == 'put'){
            const response = await axios.put(`${SERVER_URL}/update-${reqURL}`, data, {
                params: {
                    get_id: id
                },
                headers: {
                    Authorization: `Bearer ${full_token}`
                }
            })
            if (!response.data) { 
                // substituir por uma verificação de erro compativel com o seu backend
                return false
            }

            cleanForm()
            return 200
        }
    
    }


export default SubmitForm