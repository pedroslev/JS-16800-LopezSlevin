localStorage.setItem('usersession', false);

function Login(user, password){
    console.log(user);
    console.log(password);
    if(user == "admin" && password == "admin")
    {
        localStorage.setItem('usersession', true)
        //alert("login correcto");
        window.location.href = "consola.html";

    }else{
        
        if(user == "admin" && password != "admin")
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