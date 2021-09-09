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
  Spinner();
  let todo = "todo";
  LoadJSONProperties();
  ValidateProperties();
  //async  
  setTimeout(function(){
    MuestreoProds(todo);
    MuestreoCategorias();
    MuestreoCart();}, 2000);
    
}

function GetItems(clave){
    return localStorage.getItem(clave);
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
      <button type="button" class="btn btn-primary" style="margin-left:3rem;" id="ordenarbtn${productosarray[index].id}" onclick="addToCart( ${productosarray[index].nombre}, ${productosarray[index].precio}, '${productosarray[index].id}');">Ordenar</button>
   </div>
  </div>`;
  $("#contenedor").append(content)
  }
  
    }  
  }
}

function addToCart(Nombre, Precio, IdProducto){
document.getElementById('pagar').disabled = false;
let Cantidad = document.getElementById('cantidad'+ IdProducto).value
let id;
let preciototal = JSON.parse(GetItems("total"));
if(ordenarray == ""){id = 0;}else{id = ordenarray.length};
ordenarray.push(new orden(id, Nombre, Cantidad, Precio));
totalprice = totalprice + (Cantidad * Precio);

SaveItems("total", totalprice);
SaveItems("orden", JSON.stringify(ordenarray));
document.getElementById('ordenarbtn'+IdProducto).disabled = true;

  let cart = `<tr id="orden${id}">
  <th scope="row">${id}</th>
  <td>${Nombre}</td>
  <td>${Cantidad}  x</td>
  <td>$${Precio}</td>
  <td><button class="btn btn-outline-secondary" id="delete${id}" onclick="DeleteCartItem('${Nombre}')"><img style="width: 1em;" src="./media/trash.svg"></img></button></td>
  </tr>`;
  $("#order").prepend(cart);

  $("#totalprice").html("$" + totalprice);
 
}


function MuestreoCart(){
let total = JSON.parse(GetItems("total"));
if(total == null){total = 0};
if(JSON.parse(GetItems("orden")) == null){ordenarray = []}else{
  ordenarray = JSON.parse(GetItems("orden"));
}

for (let index = 0; index < ordenarray.length; index++) {
  let cart = `<tr id="orden${ordenarray[index].id}">
  <th scope="row">${ordenarray[index].id}</th>
  <td>${ordenarray[index].nombre}</td>
  <td>${ordenarray[index].cantidad}  x</td>
  <td>$${ordenarray[index].precio}</td>
  <td><button class="btn btn-outline-secondary" id="delete${ordenarray[index].id}" onclick="DeleteCartItem('${ordenarray[index].nombre}')"><img style="width: 1em;" src="./media/trash.svg"></img></button></td>
  </tr>`;
  $("#order").prepend(cart);
}

$("#totalprice").html("$" + total);
}

function EmptyCart(){
  totalprice = 0;
  let cart = [];
  for (let index = 0; index < productosarray.length; index++) {
    document.getElementById('ordenarbtn'+ productosarray[index].id).disabled = false;
  }
  SaveItems("total", totalprice);
  SaveItems("orden", JSON.stringify(cart));
  ordenarray= [];
  $("#order").empty();
  document.getElementById('pagar').disabled = false;
  $("#totalprice").html("$" + totalprice);
}

function DeleteCartItem(nombre){
  //Enable Order Button
  for (let index = 0; index < productosarray.length; index++) {
    if(nombre == productosarray[index].nombre){

      document.getElementById('ordenarbtn'+ productosarray[index].id).disabled = false;
    }
  }

  //obtaining real id
  let id;
  for (let index = 0; index < ordenarray.length; index++) {    
    if(ordenarray[index].nombre == nombre){
      id = index;
    }
  }
  
  //Eliminacion del objeto
  let cartnuevo = [];
  let i = 0;
  if(ordenarray.length != 1){
    for (let index = 0; index < ordenarray.length; index++) {
      if(ordenarray[index].id != ordenarray[id].id){
        cartnuevo.push(ordenarray[index]);
        }
      }
      let precioless = ordenarray[id].precio * ordenarray[id].cantidad;
      totalprice = totalprice - precioless;
      SaveItems("total", totalprice);
      ordenarray = cartnuevo;
      SaveItems("orden", JSON.stringify(ordenarray));
      $("#order").empty();
      //$("#totalprice").empty();
      MuestreoCart();
  }else{
    document.getElementById('pagar').disabled = false;
    totalprice = 0;
    SaveItems("total", totalprice);

    ordenarray = cartnuevo;
    SaveItems("orden", JSON.stringify(ordenarray));
    $("#order").empty();
    $("#totalprice").html("$" + totalprice);
    MuestreoCart();
  }
  

  
}

function Limpieza(){
  localStorage.clear();
  window.location.reload();
}

function CheckOut(){
  window.location.href = "checkout.html";
}

function LoadJSONProperties(){
  let array = [];
  let propertiesjson = './data/properties.json';
  let responses = $.getJSON(propertiesjson, function(response) {
      for (let index = 0; index < response.length; index++) {
          array[index] = response[index];
      }
      SaveItems("properties", JSON.stringify(array));
      properties = JSON.parse(GetItems("properties"));
  });
}



function LoadJSONProductos(){
  let array = [];
  let productos = './data/productos.json';
  let responses = $.getJSON(productos, function(response) {
      for (let index = 0; index < response.length; index++) { 
          array[index] = response[index];
      }
      SaveItems("productos", JSON.stringify(array));
      productosarray = JSON.parse(GetItems("productos"));
      
  });
}

function LoadJSONCategorias(){
  let array = [];
  let categorias = './data/categorias.json';
  $.getJSON(categorias, function(response) {
      for (let index = 0; index < response.length; index++) {
          array[index] = response[index];
      }
      SaveItems("categorias", JSON.stringify(array));
      categoriasarray = JSON.parse(GetItems("categorias"));
  });
}

//Testing
function LoadJSON(){
  LoadJSONCategorias();
  LoadJSONProductos();
}

function ValidateProperties(){
  setTimeout(function(){
    if(properties[0].BarName != null){SaveItems("BarName", JSON.stringify(properties[0].BarName))}else{SaveItems("BarName", JSON.stringify("DevBar"))}
    if(properties[0].Slogan != null){SaveItems("Slogan", JSON.stringify(properties[0].Slogan))}else{SaveItems("Slogan", JSON.stringify("A bar made for developers by developers"))}
    $("#brand").text(JSON.parse(GetItems("BarName")));
    $("#slogan").text(properties[0].Slogan);
    for (let index = 0; index < properties.length; index++) {
        if(properties[index].LoadFromJSON){LoadJSON();}}}, 2500)
        
}
function Spinner() {
  $("#contenedor").fadeOut("slow", function(){
    $("#Spinner").fadeIn("1000");
    $("#Spinner").slideToggle("1500");
    $("#contenedor").slideToggle("0");
})
}