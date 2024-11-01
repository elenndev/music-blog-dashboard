function getChangeTheme(theme, handleChangeTheme){
    // Responsabilidade: setar o checkbox
    const checkLightTheme = document.querySelector(".input");
    
    // checkTheme.checked = JSON.parse(localStorage.getItem("mode"));
    // console.log("aqui em cima, o theme é: ", theme)
    if (theme === "light"){
        checkLightTheme.checked
    } 
    
    checkLightTheme.addEventListener("input", () => {
        const newTheme = checkLightTheme.checked ? "dark" : "light"
        console.log("identificado e onovo tema é: ",newTheme)
        // setTheme(newTheme)
        localStorage.setItem("theme", newTheme)
        handleChangeTheme()
    })

    
    
    
    // function updateLocale() {
    //     localStorage.setItem("mode", JSON.stringify(checkTheme.checked))
    // }
    
}

export default getChangeTheme