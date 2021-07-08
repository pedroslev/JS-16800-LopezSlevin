function Start()
{
document.getElementById("main").classList.add("Ocultar");
document.getElementById("Calculador").classList.remove("Ocultar");
}

function Calcular()
{
var complete = false

if(document.getElementById("total").value=='' || document.getElementById("Interes").value == ''){
    alert('Por favor, ingresar todos los datos');
    complete = false;
}else{
    complete = true;
}

if(complete){
    document.getElementById("Calculador").classList.add("Ocultar");
    document.getElementById("Resultado").classList.remove("Ocultar");
    
    let PrecioTotal = parseFloat(document.getElementById("total").value);
    let Cuotas = parseFloat(document.getElementById("Cuotas").value);
    let Interes = parseFloat(document.getElementById("Interes").value);
    let PrecioFinal = PrecioTotal + (PrecioTotal * (Interes *0.01));
    
    if(Interes != 0){
     console.log(PrecioFinal);
     console.log(PrecioFinal/Cuotas);
    }else{
    console.log(PrecioTotal/Cuotas);
    }
    
    document.getElementById("totalprice").value = PrecioFinal;
    document.getElementById("totalpercuota").value = PrecioFinal/Cuotas;
    
}


}

function Reset()
{
location.reload();
}