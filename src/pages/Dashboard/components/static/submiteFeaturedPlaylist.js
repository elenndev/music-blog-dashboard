import supabase from '../../../../components/static/auth';

function submitFeaturedPlaylist(event){
    event.preventDefault()
    let input = document.querySelector('div.featured-playlist>form>input').value
    const embed_link = 'https://open.spotify.com/embed/playlist/'
    const playlist = embed_link + input.split('playlist/')[1]
    // localStorage.setItem('featuredPlaylist', playlist)

    
    const submit = async() =>{
        const {data: {user}} = await supabase.auth.getUser();
        if (user.error) {
            console.error('Erro ao obter usuário:', user.error);
            return;
        }
        if (user.aud == 'authenticated'){
            console.log('autenticado')
            // const text_value = playlist
            const data = {
                text_value: playlist
            }
            const {error: updateError, status, statusText} = await supabase.from('blog-saves').update({text_value: playlist}).eq("id",1).select()
            console.log('status: ',statusText)
            if(updateError){
                console.log(updateError)
            }
            document.querySelector('div.featured-playlist>form>input').value = ""
        }


    }
    
    submit()
}

export default submitFeaturedPlaylist
