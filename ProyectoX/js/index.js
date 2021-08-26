//Global ones
let productosarray = [];
let categoriasarray = [];
let ordenarray = [];
let totalprice = 0;
class orden{
  constructor(id, nombre, cantidad, precio){
      this.id = id;
      this.nombre = nombre.toUpperCase();
      this.cantidad = cantidad;
      this.precio = precio;
  }
}

function OnLoad(){
  let todo = "todo";
  MuestreoProds(todo);
  MuestreoCategorias();
  MuestreoCart();
  //MuestreoCart();
}

function GetItems(clave){
    return localStorage.getItem(clave);
}

function MuestreoProds(categoria){
    productosarray = JSON.parse(GetItems("productos"));
    categoriasarray = JSON.parse(GetItems("categorias"));

    if(productosarray != undefined){
      $("#contenedor").empty();
for (let index = 0; index < productosarray.length; index++) {

  if (categoria == "todo") {
    let content = `<div class="card shadow-lg p-3 mb-5 bg-white" style="width: 15rem;margin-left: 5rem;margin-bottom:0.5rem;border-radius: 1.5em;">
    <img class="card-img-top" style="border-radius: 1em;" src="${productosarray[index].foto}" alt="Card image cap">
    <div class="card-body">
      <h6 class="card-title"> ${productosarray[index].nombre} </h6>
      <p class="card-text"> ${productosarray[index].descripcion} </p>
      <p class="card-text"> $ ${productosarray[index].precio} </p>
      <div class="form-group mx-sm-4 mb-2">
      <input type="Number" class="form-control" id="cantidad${productosarray[index].id}" value="1" placeholder="Cantidad">
      </div>
      <input type="hidden" id="idprod" value="${productosarray[index].id}">
      <button type="button" class="btn btn-primary" style="margin-left:3rem;" id="ordenarbtn${productosarray[index].id}" onclick="addToCart('${productosarray[index].nombre}', '${productosarray[index].precio}', '${productosarray[index].id}');">Ordenar</button>
   </div>
  </div>`;
  

  $("#contenedor").append(content);
  }

  if(productosarray[index].categoria == categoria){
    let content = `<div class="card shadow-lg p-3 mb-5 bg-white" style="width: 15rem;margin-left: 5rem;margin-bottom:0.5rem;border-radius: 1.5em;">
    <img class="card-img-top" style="border-radius: 1em;" src="${productosarray[index].foto}" alt="Card image cap">
    <div class="card-body">
      <h6 class="card-title"> ${productosarray[index].nombre} </h6>
      <p class="card-text"> ${productosarray[index].descripcion} </p>
      <p class="card-text"> $ ${productosarray[index].precio} </p>
      <div class="form-group mx-sm-4 mb-2">
      <input type="Number" class="form-control" value="1" id="cantidad${productosarray[index].id}" placeholder="Cantidad">
      </div>
      <input type="hidden" id="idprod" value="${productosarray[index].id}">
      <button type="button" class="btn btn-primary" style="margin-left:3rem;" id="ordenarbtn${productosarray[index].id}" onclick="addToCart( ${productosarray[index].nombre}, ${productosarray[index].precio}, document.getElementbyId('cantidad${productosarray[index].id}').value);">Ordenar</button>
   </div>
  </div>`;
  $("#contenedor").append(content)
  }
  
    }  
  }
}

//Guardado en localstorage de valores generico
function SaveItems(clave, valor){
  localStorage.setItem(clave, valor);
}

function MuestreoCategorias(){
  categoriasarray = JSON.parse(GetItems("categorias"));
  categoriasarray.sort();
  for (let index = 0; index < categoriasarray.length; index++) {
  let content = `<li class="nav-item">
  <a class="nav-link anchorsNav" aria-current="page" id="${categoriasarray[index]}" onclick="MuestreoProds('${categoriasarray[index]}')"> ${categoriasarray[index]}</a>
  </li>`;
  $("#categorias").append(content);
  }
  
}


function addToCart(Nombre, Precio, Id){
let Cantidad = document.getElementById('cantidad'+ Id).value
document.getElementById('ordenarbtn'+Id).innerHTML = "Agregar";
let id = 0;
if(ordenarray == null){id = 0;}else{id = ordenarray.length};
ordenarray.push(new orden(id, Nombre, Cantidad, Precio));
totalprice = totalprice + Cantidad * Precio;

SaveItems("total", totalprice);
SaveItems("orden", JSON.stringify(ordenarray));

  let cart = `<tr>
  <th scope="row">${id}</th>
  <td>${Nombre}</td>
  <td>${Cantidad}</td>
  <td>$${Precio}</td>
  <td><button class="btn btn-outline-secondary" id="delete${id}" onclick="DeleteCartItem(${id});"><img style="width: 1em;" src="./media/trash.svg"></img></button></td>
  </tr>`;
  $("#order").prepend(cart);

  $("#totalprice").empty();
  let total = `<th scope="row"></th>
  <td></td>
  <td style="font-weight: 700">Total:</td>
  <td style="font-weight: 700">$${totalprice}</td>`;
  $("#totalprice").append(total);
}


function MuestreoCart(){
let total = JSON.parse(GetItems("total"));
ordenarray = JSON.parse(GetItems("orden"));

for (let index = 0; index < ordenarray.length; index++) {
  console.log(orden[index]);
  let cart = `<tr>
  <th scope="row">${ordenarray[index].id}</th>
  <td>${ordenarray[index].nombre}</td>
  <td>${ordenarray[index].cantidad}</td>
  <td>$${ordenarray[index].precio}</td>
  <td><button class="btn btn-outline-secondary" id="delete${ordenarray[index].id}" onclick="DeleteCartItem(${ordenarray[index].id});"><img style="width: 1em;" src="./media/trash.svg"></img></button></td>
  </tr>`;
  $("#order").prepend(cart);
}

$("#totalprice").empty();
  let totalcontent = `<th scope="row"></th>
  <td></td>
  <td style="font-weight: 700">Total:</td>
  <td style="font-weight: 700">$${total}</td>`;
  $("#totalprice").append(totalcontent);
}

function EmptyCart(){
  totalprice = 0;
  let cart = [];
  for (let index = 0; index < ordenarray.length; index++) {
    document.getElementById('ordenarbtn'+ordenarray[index].id).innerHTML = "Ordenar"; 
  }
  SaveItems("total", totalprice);
  SaveItems("orden", JSON.stringify(cart));
  ordenarray= [];
  $("#order").empty();
  $("#totalprice").empty();
}

function DeleteCartItem(id){
  for (let index = 0; index < productosarray.length; index++) {
  if(ordenarray[id].nombre == productosarray[index].nombre){
    document.getElementById('ordenarbtn'+index).innerHTML = "Ordenar";
    }
  }
  
  let cartnuevo = [];
  let i = 0;
  for (let index = 0; index < ordenarray.length; index++) {
  if(ordenarray[index].id != id){
    cartnuevo.push(ordenarray[i]);
    i = i + 1;
    }
  }
  console.log(cartnuevo);
  console.log("precio de producto ind: "+ordenarray[id].precio);
  console.log("cantidad de prod:"+ordenarray[id].cantidad);
  let precioless = ordenarray[id].precio * ordenarray[id].cantidad;
  console.log("precioless es:"+precioless);
  let total = JSON.parse(GetItems("total"));
  console.log("precio total de memoria:"+total);
  totalprice = totalprice - precioless;
  console.log("totalprice es :"+totalprice);
  SaveItems("total", totalprice);

  ordenarray = cartnuevo;
  SaveItems("orden", JSON.stringify(ordenarray));
  $("#order").empty();
  $("#totalprice").empty();
  MuestreoCart();
}

