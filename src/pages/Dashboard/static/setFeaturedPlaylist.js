function submitFeaturedAlbum(event){
    event.preventDefault()
    const input = document.querySelector('#setFeaturedPlaylist.playlist-link').value
    const link = full_link.split('playlist/')[1]
    localStorage.setItem('featuredPlaylist', link)
    console.log('o link antigo era ', full_link, ' o novo link é ', link )
}

export default submitFeaturedAlbum