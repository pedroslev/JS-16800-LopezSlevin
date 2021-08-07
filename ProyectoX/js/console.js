//constructor del producto
class productos{
    constructor(id, nombre, categoria, descripcion, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}
//constructor de globales
let id;
let productosarray = [];
let categoriasarray = [];
let usersession;


//Obtiene todos los valores por mas que cierre y vuelva a abrir el navegador por error o recargue para el muestreo en consola
function Obtencion(){
    if(JSON.parse(GetItems("productos")) != null || JSON.parse(GetItems("categorias")) != null){
    productosarray = JSON.parse(GetItems("productos"));
    categoriasarray = JSON.parse(GetItems("categorias"));
    MuestreoCategorias();
    MuestreoProductos();
    }
    
}

//Debug functions
//Funcion para Debug -> vacio todos los productos y categorias
function Limpieza(){
    localStorage.clear();
    window.location.reload();
}
//Muestreo de array
function ArrayDebug(array){
    for (let index = 0; index < array.length; index++) {
        console.log(array[index]);
    }
}

//Obtencion de variables en el localstorage
function GetItems(clave){
    return localStorage.getItem(clave);
}


//Limpia el selector de categorias para no duplicar en cuanto al muestreo -> deberia pasarlo a jquery
function ClearSelectCategorias(domElement){
    if(categoriasarray.length != 0){
        let select = document.querySelectorAll('#'+domElement+' option');
        select.forEach( o => o.remove());
        categoriasarray.sort();
        for (let index = 0; index < categoriasarray.length; index++) {
            if(categoriasarray[index] != undefined){
                let option = document.createElement('option');
                option.text = categoriasarray[index];
                let selectBox = document.getElementById(domElement);
                console.log(selectBox);
                selectBox.add(option);
            }
        }
    }else{
        let select = document.querySelectorAll('#'+domElement+' option');
        select.forEach( o => o.remove());
        let option = document.createElement('option');
        option.text = "Aun no hay categorias";
        let selectBox = document.getElementById(domElement);
        console.log(selectBox);
        selectBox.add(option);
    }
}

//Limpiar el selector de productos para no duplicar en cuanto al muestreo -> deberia pasarlo a jquery
function ClearSelectProductos(domElement){
    if(productosarray.length != 0){
        let select = document.querySelectorAll('#'+domElement+' option');
        select.forEach( o => o.remove());
        productosarray.sort();
        for (let index = 0; index < productosarray.length; index++) {
            if(productosarray[index] != undefined){
                let option = document.createElement('option');
                option.text = productosarray[index].nombre;
                let selectBox = document.getElementById(domElement);
                console.log(selectBox);
                selectBox.add(option);
            }
        }
    }else{
        let select = document.querySelectorAll('#'+domElement+' option');
        select.forEach( o => o.remove());
        let option = document.createElement('option');
        option.text = "Aun no hay productos";
        let selectBox = document.getElementById(domElement);
        selectBox.add(option);
    }
}

function MuestreoCategorias(){
    ClearSelectCategorias("categoria");
    ClearSelectCategorias("categoriaeliminar");
    
}

function MuestreoProductos(){
    ClearSelectProductos("productoaeliminar");
}

//Subida de producto -> faltan imagenes dinamicas en prox entrega si messi quiere
function UploadProducto(nombre, categoria, descripcion, precio){
    //check values for null input
    if(CheckProductForm()){
    id = productosarray.length;
    productosarray.push(new productos(id, nombre, categoria, descripcion, precio));
    ClearFormProductos();

    //debug
    ArrayDebug(productosarray);

    //Storage
    SaveItems("productos", JSON.stringify(productosarray));
    }else{
        alert("Por favor, llena los valores antes de cargar el producto");
        return;
        }
MuestreoProductos();
}


//Checkeo de ingreso de todos los valores de form de carga
function CheckProductForm(){
    if(document.getElementById('nombre').value == '' || document.getElementById('descripcion').value == '' || document.getElementById('precio').value == '' || document.getElementById('categoria').value == "Aun no hay categorias" || document.getElementById('categoria').value == "")
    {
        document.getElementById('nombre').value = '';
        document.getElementById('descripcion').value = '';
        document.getElementById('precio').value = '';
        return false;
    }else{
        return true;
    }
}

//Vaciado de form de carga para cuando es exitoso/erroneo
function ClearFormProductos(){
    document.getElementById('nombre').value = '';
        document.getElementById('descripcion').value = '';
        document.getElementById('precio').value = '';
}

//Subida de categorias -> form categorias upload
function UploadCategorias(categoria){
    if(document.getElementById('nombrecategoria').value == ''){
        alert('No es posible cargar una categoria nula.');
        return;
    }else{
    categoriasarray.push(categoria);

    //debug
    ArrayDebug(categoriasarray);
    document.getElementById('nombrecategoria').value = '';
    SaveItems("categorias", JSON.stringify(categoriasarray));
    MuestreoCategorias();
    }
    
}

//Eliminacion de valor en array de cateria -> falta evitar el empty space en memoria
function DeleteCategorias(categoria){
    let used = false;
    for (let index = 0; index < productosarray.length; index++) {
    if(productosarray[index].categoria == categoria){
        used = true;
    }
    }

    if(used == false){
        if(categoriasarray.length != 1){
            let aux = 0;
        for (let index = 0; index < categoriasarray.length; index++) {
            if(categoriasarray[index] == categoria){
                console.log("entro");
                aux = index;
                delete categoriasarray[index]
            }
        }
        SaveItems("categorias", JSON.stringify(categoriasarray));
        MuestreoCategorias();
        }else{
            let arrayaux = [];
            categoriasarray = arrayaux;
            SaveItems("categorias", JSON.stringify(categoriasarray));
            MuestreoCategorias();
        }
    }else{
        alert("La categoria a eliminar esta en uso en un producto, por lo tanto no es posible eliminarla");
    }
    

}

//Eliminacion de producto sin dejar empty space en memoria
function DeleteProducto(producto){
    let aux = 0
    let deleted = false;
    let recorrido = productosarray.length;
    if(productosarray.length != 1){
        recorrido = productosarray.length - 1;
        if(document.getElementById('productoaeliminar')[0].textContent != document.getElementById('SinProductos')){
            for (let index = 0; index < recorrido; index++) {
                if(productosarray[index].nombre == producto){
                    aux = index;
                    delete productosarray[index];
                    deleted = true
                }
                if(deleted){
                    productosarray[index - 1] = productosarray[index + 1]
                }
            }
    }
    
        SaveItems("productos", JSON.stringify(productosarray));
        MuestreoProductos();
    }else{
        let arrayaux = []
        productosarray = arrayaux;
        SaveItems("productos", JSON.stringify(productosarray));
        MuestreoProductos();
    }
}

//Guardado en localstorage de valores generico
function SaveItems(clave, valor){
    localStorage.setItem(clave, valor);
}

//Check de si el usuario se encuentra logeado
function LoginCheck(){
    usersession = localStorage.getItem('usersession');
    console.log(usersession);
    if(usersession == false || usersession == null){
        window.location.href = "restricted.html";
    }
    
}
