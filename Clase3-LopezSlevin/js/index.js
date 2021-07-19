let fin = false;
let seleccionado;
let playerarray = [];
let bolsa = [];
let playermujeres = [];
let playerhombres = [];
let playerinteresH = [];
let playerinteresM = [];
let playerinteresA = [];
let tirador=0;
let id;

//constructor del objeto
class players{
    constructor(id, nombre, sexo, interes){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.sexo = sexo;
        this.interes = interes;
    }
}


function start(){
    //simple muestreo y ocultado de divs en el html
        document.getElementById("start").classList.add("Ocultar");
        document.getElementById("DataColletor").classList.remove("Ocultar");
}


function PushData(){   
    //generacion de logica de ID para cada player
    if(playerarray.length == 0){
        id = 0;
    }else{
        id = playerarray.length;
    }

    //check de llenado de datos
    if(document.getElementById("Nombre").value == "" ){
        alert("Por favor, completar con el nombre del jugador");
    }else{
    //push de cada valor que se toma luego de llenar los datos -> se llena el array de objetos
    playerarray.push(new players(id, document.getElementById("Nombre").value, document.getElementById("Sexo").value, document.getElementById("Interes").value));
    bolsa.push(new players(id, document.getElementById("Nombre").value, document.getElementById("Sexo").value, document.getElementById("Interes").value));
    //debug log :)
    for (let index = 0; index < playerarray.length; index++) {
      console.log(playerarray[index]);
    }
    }
    
}

function gameready(){
    //Ocultar y display de siguiente div
    document.getElementById("DataColletor").classList.add("Ocultar");
    document.getElementById("gameready").classList.remove("Ocultar");
    //Primer BottleSpin! :D
    BottleSpin();

}




function BottleSpin(){
        //display del nombre de tirador en el juego
        document.getElementById("tirador").innerHTML = playerarray[tirador].nombre;

        //Armado de distintos array en donde se juntan intereses y sexos. Luego se utilizan para comparativas
        playermujeres = playerarray.filter(playerarray => playerarray.sexo == "Femenino");
        playerhombres = playerarray.filter(playerarray => playerarray.sexo == "Masculino");
        playerinteresH = playerarray.filter(playerarray => playerarray.interes == "Hombres");
        playerinteresM = playerarray.filter(playerarray => playerarray.interes == "Mujeres");
        playerinteresA = playerarray.filter(playerarray => playerarray.interes == "Ambos");

        switch(playerarray[tirador].interes){

            //Al tirador le interesan los hombres
            case "Hombres":
                //check del sexo del tirador -> genera dependencia al apuntado
                if(playerarray[tirador].sexo == "Masculino"){
                    //recorro interes del array de intereses del tirador para agregar las coincidencias de interes de acuerdo con su sexo
                  for (let i = 0; i < playerhombres.length; i++) {
                      if(playerhombres[i].interes == "Hombres"){
                        bolsa.push(new players(playerhombres[i].id, playerhombres[i].nombre));
                      }
                    //check de interes sin preferencia para incluir con doble posibilidad a jugadores sin orientacion definida pero con sexo de interes del tirador
                    if(playerinteresA[i].sexo == "Masculino"){
                    bolsa.push(new players(playerinteresA[i].id, playerinteresA[i].nombre));
                    }
                  }
                  

                }else{
                    //recorro interes del array de intereses del tirador para agregar las coincidencias de interes de acuerdo con su sexo
                    for (let index = 0; index < playerhombres.length; index++) {
                        if(playerhombres[index].interes == "Mujeres"){
                          bolsa.push(new players(playerhombres[index].id, playerhombres[index].nombre));
                        }
                        //check de interes sin preferencia para incluir con doble posibilidad a jugadores sin orientacion definida pero con sexo de interes del tirador
                        if(playerinteresA[index].sexo == "Masculino"){
                          bolsa.push(new players(playerinteresA[index].id, playerinteresA[index].nombre));
                        }
                    }
                    
                }
                
            break;

            //Al tirador le interesan las mujeres
            case "Mujeres":
                //check del sexo del tirador-> genera dependencia al apuntado
                if(playerarray[tirador].sexo == "Masculino"){
                    //recorro interes del array de intereses del tirador para agregar las coincidencias de interes de acuerdo con su sexo
                    for (let index = 0; index < playermujeres.length; index++) {
                        if(playermujeres[index].interes == "Hombres"){
                          bolsa.push(new players(playermujeres[index].id, playermujeres[index].nombre));
                        }
                        //check de interes sin preferencia para incluir con doble posibilidad a jugadores sin orientacion definida pero con sexo de interes del tirador
                        if(playerinteresA[index].sexo == "Femenino"){
                        bolsa.push(new players(playerinteresA[index].id, playerinteresA[index].nombre));
                        }
                    }
                    
                    
                }else{
                    //recorro interes del array de intereses del tirador para agregar las coincidencias de interes de acuerdo con su sexo
                    for (let index = 0; index < playermujeres.length; index++) {
                        if(playermujeres[index].interes == "Mujeres"){
                          bolsa.push(new players(playermujeres[index].id, playermujeres[index].nombre));
                        }
                        //check de interes sin preferencia para incluir con doble posibilidad a jugadores sin orientacion definida pero con sexo de interes del tirador
                        if(playerinteresA[index].sexo == "Femenino"){
                        bolsa.push(new players(playerinteresA[index].id, playerinteresA[index].nombre));
                        }
                    }
                    
                }
            break;

            //Al tirador le interesan ambos sexos
            case "Ambos":
                //check del sexo del tirador-> genera dependencia al apuntado
                if(playerarray[tirador].sexo == "Masculino"){
                    //recorro interes del array de intereses del tirador para agregar las coincidencias de interes de acuerdo con su sexo
                    for (let index = 0; index < playerarraymujeres.length; index++) {
                        if(playerarray[index].interes == "Hombres"){
                          bolsa.push(new players(playermujeres[index].id, playermujeres[index].nombre));
                        }
                        //check de interes sin preferencia para incluir con doble posibilidad a jugadores sin orientacion definida pero con sexo de interes del tirador
                        //no check, no tiene orientacion definida
                        bolsa.push(new players(playerinteresA[index].id, playerinteresA[index].nombre));
                    }
                }else{
                    //recorro interes del array de intereses del tirador para agregar las coincidencias de interes de acuerdo con su sexo
                    for (let index = 0; index < playerarray.length; index++) {
                        if(playerarray[index].interes == "Mujeres"){
                          bolsa.push(new players(playermujeres[index].id, playermujeres[index].nombre));
                        }
                        //check de interes sin preferencia para incluir con doble posibilidad a jugadores sin orientacion definida pero con sexo de interes del tirador
                        //no check, no tiene orientacion definida
                        bolsa.push(new players(playerinteresA[index].id, playerinteresA[index].nombre));
                    }
                }
            break;

        }
        
        //debug log
        for (let index = 0; index < bolsa.length; index++) {
            console.log(bolsa[index]);
          }

        //randomizer para seleccionar a quien apunta la botella
        seleccionado = parseInt(Math.random() * (bolsa.length - 0) + 0);

        //Check para que la botella no apunte a uno mismo
        while(bolsa[seleccionado].id == playerarray[tirador].id){
            seleccionado = parseInt(Math.random() * (bolsa.length - 0) + 0);
        }
        
        //Display del apuntado por la botella
        document.getElementById("tirador").innerHTML = bolsa[seleccionado].nombre;

        //Increment del turno para el tirador, si es el ultimo vuelve a empezar la ronda
        if(tirador == playerarray.length - 1){
            tirador= 0;
        }else{
            tirador = tirador + 1;
        }
    
}
