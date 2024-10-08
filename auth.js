const Login = (event) => {
    event.preventDefault()
    const button = document.querySelector("#button_login")
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value

    if (email.length < 5 || password.length==0){
        alert('Credenciais inválidas')
        return
    } 

    const data = {
        email: email,
        password: password
    }
    
    fetch('http://127.0.0.1:8000/login/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        console.log("response status:",response.status)
        if (!response.ok){
            throw new Error('Network response was not okay')
        }
        return response,json()
    }).then(data => {
        console.log('sucess')
    }).catch((error) => {
        console.log('Erro:', error)
    })
}

export default Login