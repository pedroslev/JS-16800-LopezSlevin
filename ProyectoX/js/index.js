//Global ones
let productosarray = [];
let categoriasarray = [];

function GetItems(clave){
    return localStorage.getItem(clave);
}

function MuestreoProds(){
     productosarray = JSON.parse(GetItems("productos"));
    categoriasarray = JSON.parse(GetItems("categorias"));


}