let pedidos = []
class especificaciones{
    constructor(nombre, observaciones, estado){
        this.nombre = nombre.toUpperCase();
        this.observaciones = observaciones;
        this.estado = estado;
    }
}

let detalles = JSON.parse(GetItems("especificaciones"));

function OnLoad(){

    let ordenarray = JSON.parse(GetItems("orden"));
    let total = JSON.parse(GetItems("total"));

    for (let index = 0; index < ordenarray.length; index++) {
        let content = `
        <tr>
        <th scope="row">${ordenarray[index].nombre}</th>
        <td>${ordenarray[index].cantidad}</td>
        <td>$${ordenarray[index].precio}</td>                                    
        </tr>`;
        $("#resumenProductos").append(content); 
        
        $("#subtotal").html(`$` + total + ` ARS`)
    }
}

function GetItems(clave){
    return localStorage.getItem(clave);
}

function SaveItems(clave, valor){
    localStorage.setItem(clave, valor);
  }

function ProcessCashCheckout(observaciones, nombre){
    if(nombre == "" || nombre == null ){
        alert("Por favor ingresa un nombre para poder identificarte");
        return
    }
    if(JSON.parse(GetItems("pedidos")) == null){pedidos = []}else{pedidos = JSON.parse(GetItems("pedidos"));}
    let ordenarray = JSON.parse(GetItems("orden"));
    pedidos.push(ordenarray);
    SaveItems("pedidos", JSON.stringify(pedidos))
    detalles = JSON.parse(GetItems("especificaciones"))
    if(detalles == null){detalles = []}
    detalles.push(new especificaciones(nombre, observaciones, "pendiente"));
    SaveItems("especificaciones", JSON.stringify(detalles))
    setTimeout(function(){window.location.href = "./clientqr.html";}, 1500);
}