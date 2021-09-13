function OnLoad() {
    PrintOrders();
}


function GetItems(clave){
    return localStorage.getItem(clave);
}

function SaveItems(clave, valor){
    localStorage.setItem(clave, valor);
  }

function PrintOrders (){
let pedidos = JSON.parse(GetItems("pedidos"));
let detalles = JSON.parse(GetItems("especificaciones"));

if(pedidos != null){
for (let index = 0; index < pedidos.length; index++) {
    if(detalles[index].estado == "pendiente"){
        let content = `<div class="card" style="width: 18rem;margin: 0.5em;">
        <div class="card-body">
            <div class="d-flex" style="padding-bottom: 1em;">
            <h5 class="card-title" id="nombre">${detalles[index].nombre}</h5>
            <button type="button" style="margin-left: 4em;" class="btn btn-warning" id="estado${index}" disabled>PENDIENTE</button>
            </div>          
            <p class="card-text" id="observaciones">${detalles[index].observaciones}</p>
        </div>
        <ul class="list-group list-group-flush" id="items${index}">     
        </ul>
        <div class="card-body d-flex" style="justify-content: center; margin-top: 1em; margin-bottom: 1em;">
            <button type="button" class="btn btn-primary" onclick="DeliverOrder(${index});">ENTREGAR</button>
        </div>
        </div>`;
        $("#pedidos").append(content);
        for (let index = 0; index < pedidos.length; index++) {
            $("#items" + index).empty();
            for (let i = 0; i < pedidos[index].length; i++) {
                let prod = `<li class="list-group-item">${pedidos[index][i].nombre} x   ${pedidos[index][i].cantidad}</li>`
                $("#items" + index).append(prod); 
                    }
                }
            } 
        }
    }else{
        let emptyorder = `<div class="d-flex" style="justify-content: center; padding-top: 10em; flex-direction: column; align-items: center;">
                <h4 style="padding-bottom: 1em;">No hay pedidos!</h4>
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>`;
              $("#pedidos").append(emptyorder);
    }
}

function DeliverOrder(id) {
    let detalles = JSON.parse(GetItems("especificaciones"));
    detalles[id].estado = "entregado";
    SaveItems("especificaciones", JSON.stringify(detalles));
    document.getElementById('estado'+id).classList.remove('btn-warning')
    document.getElementById('estado'+id).classList.add('btn-success')
    document.getElementById('estado'+id).innerHTML = "ENTREGADO";

}
