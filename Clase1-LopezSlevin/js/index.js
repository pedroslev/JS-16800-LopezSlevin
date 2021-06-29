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


function Reset(){
    location.reload();
}