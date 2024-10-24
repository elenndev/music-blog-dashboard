function submitFeaturedPlaylist(event){
    event.preventDefault()
    let input = document.querySelector('div.featured-playlist>form>input').value
    const embed_link = 'https://open.spotify.com/embed/playlist/'
    const playlist = embed_link + input.split('playlist/')[1]
    console.log(playlist)
    localStorage.setItem('featuredPlaylist', playlist)
    
    document.querySelector('div.featured-playlist>form>input').value = ""
}

export default submitFeaturedPlaylist
