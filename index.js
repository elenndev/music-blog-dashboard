const home = document.querySelector('a.home')
const more = document.querySelector('a.more')
if (window.location.pathname == "/") {
    home.classList.add('current-page')
}