//constructor del producto
class productos{
    constructor(id, nombre, categoria, descripcion, precio){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.precio = precio;
        //this.foto = foto
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
                selectBox.add(option);
            }
        }
    }else{
        let select = document.querySelectorAll('#'+domElement+' option');
        select.forEach( o => o.remove());
        let option = document.createElement('option');
        option.text = "Aun no hay categorias";
        let selectBox = document.getElementById(domElement);
        selectBox.add(option);
    }
}

//Limpiar el selector de productos para no duplicar en cuanto al muestreo -> deberia pasarlo a jquery
function ClearSelectProductos(domElement){
    if(productosarray != null){
        if(productosarray.length != 0){
        let select = document.querySelectorAll('#'+domElement+' option');
        select.forEach( o => o.remove());
        productosarray.sort();
        for (let index = 0; index < productosarray.length; index++) {
            if(productosarray[index] != undefined){
                let option = document.createElement('option');
                option.text = productosarray[index].nombre;
                let selectBox = document.getElementById(domElement);
                selectBox.add(option);
            }
        }}
        
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

    if(productosarray != undefined){

        //eliminar todo lo anterior
        if (productosarray != 0) {
            $("#tablaproductos").empty();      
        }
        

    for (let index = 0; index < productosarray.length; index++) {
        let content = `<tr>
        <td> ${productosarray[index].id}</td>
        <td> ${productosarray[index].nombre} </td>
        <td> ${productosarray[index].categoria} </td>
        <td> ${productosarray[index].descripcion} </td>
        <td> $${productosarray[index].precio} </td>
        </tr>`;
      $("#tablaproductos").append(content);    
            }
        }
    }

//Subida de producto -> faltan imagenes dinamicas en prox entrega si messi quiere
function UploadProducto(nombre, categoria, descripcion, precio){

    //check values for null input
    if(CheckProductForm()){

    if(productosarray == null){
        productosarray = [];
    }else{
        id = productosarray.length;
    }
    
    if(id == 0){
        productosarray.push(new productos(id, nombre, categoria, descripcion));
        ClearFormProductos();
    }else{
        let repetido = true;

    for (let index = 0; index < productosarray.length; index++) {
        if(nombre.toUpperCase() == productosarray[index].nombre){
            alert("El producto no puede ser cargado dado a que ya existe uno con el mismo nombre");
            return;
        }else{
            repetido = false;
        }
    }

    if(repetido != true){
        productosarray.push(new productos(id, nombre, categoria, descripcion, precio));
        ClearFormProductos();
    }

    }    
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

//Eliminacion de categoria sin dejar empty space en memoria
function DeleteCategorias(categoria){
    let used = false;
    if(productosarray != null){
        for (let index = 0; index < productosarray.length; index++) {
            if(productosarray[index].categoria == categoria){
                used = true;
            }
            }
    }
    
    if(used == false){
        let categoriasnuevas = [];
        for (let index = 0; index < categoriasarray.length; index++) {
            if (categoriasarray[index] != categoria) {
                categoriasnuevas.push(categoriasarray[index]);
            }
        }
        categoriasarray = categoriasnuevas;

        SaveItems("categorias", JSON.stringify(categoriasarray));
        MuestreoCategorias();
    }else{
        alert("La categoria a eliminar esta en uso en un producto, por lo tanto no es posible eliminarla");
    }
}

//Eliminacion de producto sin dejar empty space en memoria
function DeleteProducto(producto){
    
    let productosnuevos = [];

    for (let index = 0; index < productosarray.length; index++) {
        if(productosarray[index].nombre != producto){
            productosnuevos.push(productosarray[index]);
        }
    }
        productosarray = productosnuevos;

        SaveItems("productos", JSON.stringify(productosarray));
        MuestreoProductos();
}

//Guardado en localstorage de valores generico
function SaveItems(clave, valor){
    localStorage.setItem(clave, valor);
}

//Check de si el usuario se encuentra logeado
function LoginCheck(){
    usersession = localStorage.getItem('usersession');
    if(usersession == false || usersession == null){
        window.location.href = "restricted.html";
    }
    
}


//testeo de importacion de array de objetos en almacenamiento de productos
function ExportJSON(){

if(productosarray.length == 0 ){
    alert("Aun no hay productos existentes que se puedan exportar");
}else{
    //conversion de productos a JSON en otra variable
    let json = JSON.stringify(productosarray);

    //conversion JSON string a BLOB ->  fichero de  datos planos inmutables.
    json = [json];
    let blob1 = new Blob(json, { type: "text/plain;charset=utf-8" });

    //muchisima ayuda de stackoverflow por aca
    //Check the Browser.
    let isIE = false || !!document.documentMode;
    if (isIE) {
        window.navigator.msSaveBlob(blob1, "productos.json");
    } else {
        let url = window.URL || window.webkitURL;
        link = url.createObjectURL(blob1);
        let a = document.createElement("a");
        a.download = "productos.json";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}
    
}

//todavia la foto no funciona
//foto.substring(foto.length, foto.lastIndexOf("\\"))
