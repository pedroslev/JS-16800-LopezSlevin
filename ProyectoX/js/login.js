localStorage.setItem('usersession', false);
const usuario = "admin";
const pass = "admin";

function Login(user, password){
    if(user === usuario && password === pass)
    {   
        $("#form").slideUp("slow", function(){
            $("#load").fadeIn("slow");
    });
        
        
        localStorage.setItem('usersession', true)
        setTimeout(function(){window.location.href = "consola.html";}, 1500);
        

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