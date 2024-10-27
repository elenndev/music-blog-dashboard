const home = document.querySelector('header>nav>a.home-link')
const about_me = document.querySelector('header>nav>a.aboutMe-link')
if (window.location.pathname == "/") {
    if(about_me.classList.contains('current-page')){
        about_me.classList.remove('current-page')
    }
    home.classList.add('current-page')
} else {
    if (window.location.pathname == "/sobre-mim"){
        home.classList.remove('current-page')
    }
}

if (window.location.pathname == "/sobre-mim"){
    if(home.classList.contains('current-page')){
        home.classList.remove('current-page')
    }
    about_me.classList.add('current-page')
}



