let url = window.location.href;
let params = (new URL(url)).searchParams;
let precio = params.get('precio');

function OnLoad() {
    ObtainPrice();
};


function ObtainPrice(){


$("#subtotal").html(`$` + precio + ` ARS`)
}

function ProcessPayment(){
    alert("Se ha efectuado satisfactoriamente el cobro de $"+ precio +" ARS")
}