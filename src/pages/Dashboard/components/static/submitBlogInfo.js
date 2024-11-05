import supabase from '../../../../components/static/supabaseauth';

function submitBlogInfo(type,event, info_data){
    if (event != null){
        event.preventDefault()
    }
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
            if (type == "featured playlist"){
                const {data, error} = await supabase.from('blog-saves').update({text_value: playlist}).eq("id",1)
                if(error){
                    return error
                }
                document.querySelector('div.featured-playlist>form>input').value = ""


                // Altera o id que vai ser usado para buscar o album na api do spotify
            } else if( type == "week album"){
                const {data, error} = await supabase.from("blog-saves").update({text_value: info_data}).eq("id",2)
                if(error){
                    return error
                }
            }
        }
    }
    
    submit()
}

export default submitBlogInfo
