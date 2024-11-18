import axios from "axios";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function submitBlogInfo(type,event, album){
    if (event != null){
        event.preventDefault()
    }
    let input = document.querySelector('div.featured-playlist>form>input').value
    const embed_link = 'https://open.spotify.com/embed/playlist/'
    const playlist = embed_link + input.split('playlist/')[1]
    
    const submit = async() =>{
        const full_token = localStorage.getItem('token')
        if (type== "featured playlist"){
            const data = {
                "info_name": "featured_playlist",
                "text_value": playlist
            }
            const response = await axios.put(`${SERVER_URL}/set-fast-infos`, data, {
                headers: {
                    Authorization: `Bearer ${full_token}`
                }
            })
            if (response.data){
                document.querySelector('div.featured-playlist>form>input').value = ""
            } else {
                // Depois de configurar uma conexão com o backend, remova esse Else
                localStorage.setItem('featured_playlist', playlist)
                document.querySelector('div.featured-playlist>form>input').value = ""
                
        }}else if (type =="week album"){
            // Ao estabelecer uma conexão com o backend, delete esse trecho do localStorage
            const localstorage = localStorage.setItem('week_album', album)
            const data = {
                "info_name": "week_album",
                "text_value": album
            }
            const response = await axios.put(`${SERVER_URL}/set-fast-infos`, data, {
                headers: {
                    Authorization: `Bearer ${full_token}`
                }
            })

        }
    }
    
    submit()
}

export default submitBlogInfo
