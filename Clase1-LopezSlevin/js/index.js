const today = new Date();
let TodaysDay = today.getDate();
let TodaysMonth = today.getMonth() + 1;
let TodaysYear = today.getFullYear();
let edad;

function Start(){
    document.getElementById("main").classList.remove("Ocultar");
    document.getElementById("start").classList.add("Ocultar");

    let name = prompt('Ingrese su nombre:');
    const birth = prompt('Ingrese su fecha de nacimiento (dd/mm/aaaa)');


    let date = birth.substring(0,2);
    let month = birth.substring(3,5);
    let year = birth.substring(6,10);
    console.log('Dia de nacimiento ' + date);
    console.log('Mes de nacimiento ' + month);
    console.log('Anio de nacimiento ' + year);
    //Cumple
if(TodaysDay==date && TodaysMonth == month)
{
    edad = TodaysYear - year; 
}

//Todavia no cumplio
if(TodaysMonth > month)
{
    edad = TodaysYear - year;
}else if(TodaysMonth == month && TodaysDay > date)
    {
        edad = TodaysYear - year;
    }

//ya cumplio
if(TodaysMonth < month)
{
    edad = TodaysYear - year - 1;
}else if(TodaysMonth <= month && TodaysDay >= date)
    {
        edad = TodaysYear - year - 1;
    }

console.log('Tu edad ' + edad);

    document.getElementById("PersonName").value = name;
    document.getElementById("PersonAge").value = edad;
}

function Next()
{
    document.getElementById("main").classList.add("Ocultar");
    document.getElementById("secondary").classList.remove("Ocultar");
    
    let number = parseInt(prompt("Ingrese un numero aleatorio"));
    
    if(number<=10)
    {
        document.getElementById("diez").classList.add("green");
        alert("Tu numero es menor igual a Diez!");
        console.log("Tu numero es menor igual a Diez!");
    }else if(number<=100)
    {
        document.getElementById("cien").classList.add("green");
        alert("Tu numero es menor igual a Cien!");
        console.log("Tu numero es menor igual a Cien!");
    }else if(number<=500)
    {
        document.getElementById("quinientos").classList.add("green");
        alert("Tu numero es menor igual a Quinientos!");
        console.log("Tu numero es menor igual a Quinientos!");
    }else if(number<=1000)
    {
        document.getElementById("mil").classList.add("green");
        alert("Tu numero es menor igual a Mil!");
        console.log();
    }else if(number<=5000)
    {
        document.getElementById("cincomil").classList.add("green");
        alert("Tu numero es menor igual a Cinco mil!");
        console.log("Tu numero es menor igual a Cinco mil!");
    }else if(number > 5000)
    {
        alert("Tu numero es mayor a Cinco mil!");
        console.log("Tu numero es mayor a Cinco mil!");
    }


}

function Reset(){
    location.reload();
}