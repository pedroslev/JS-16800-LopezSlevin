//Global ones
let productosarray = [];
let categoriasarray = [];
let ordenarray = [];
let totalprice = 0;
class orden{
  constructor(nombre, cantidad, precio){
      this.nombre = nombre.toUpperCase();
      this.cantidad = cantidad;
      this.precio = precio;
  }
}

function OnLoad(){
  let todo = "todo";
  MuestreoProds(todo);
  MuestreoCategorias();
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
      <button type="button" class="btn btn-primary" style="margin-left:3rem;" onclick="addToCart('${productosarray[index].nombre}', '${productosarray[index].precio}', '${productosarray[index].id}');">Ordenar</button>
   </div>
  </div>`;
  

  $("#contenedor").append(content);
  }

  if(productosarray[index].categoria == categoria){
    let content = `<div class="card shadow-lg p-3 mb-5 bg-white" style="width: 15rem;margin-left: 5rem;margin-bottom:0.5rem;border-radius: 1.5em;">
    <img class="card-img-top" style="border-radius: 1em;" src="./media/hamburguesa.jpg" alt="Card image cap">
    <div class="card-body">
      <h6 class="card-title"> ${productosarray[index].nombre} </h6>
      <p class="card-text"> ${productosarray[index].descripcion} </p>
      <p class="card-text"> $ ${productosarray[index].precio} </p>
      <div class="form-group mx-sm-4 mb-2">
      <input type="Number" class="form-control" value="1" id="cantidad${productosarray[index].id}" placeholder="Cantidad">
      </div>
      <input type="hidden" id="idprod" value=" ${productosarray[index].id} ">
      <button type="button" class="btn btn-primary" style="margin-left:3rem;" onclick="addToCart( ${productosarray[index].nombre}, ${productosarray[index].precio}, document.getElementbyId('cantidad${productosarray[index].id}').value);">Ordenar</button>
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
ordenarray.push(new orden(Nombre, Cantidad, Precio));
totalprice = totalprice + Cantidad * Precio;
SaveItems("total", totalprice);
SaveItems("orden", JSON.stringify(ordenarray));

}

/*
function MuestreoCart(){
//falta terminar
}*/