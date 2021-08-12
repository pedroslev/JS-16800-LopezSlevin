localStorage.setItem('usersession', false);
const usuario = "admin";
const pass = "admin";

function Login(user, password){
    if(user === usuario && password === pass)
    {   
        localStorage.setItem('usersession', true)
        window.location.href = "consola.html";

    }else{
        
        if(user == usuario && password != pass)
        {
            alert("Clave incorrecta");
            document.getElementById('Contrasena').value = "";
        }else{
            alert("Login incorrecto");
            document.getElementById('Usuario').value = "";
            document.getElementById('Contrasena').value = "";
        }
        
    }

}