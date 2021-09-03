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
