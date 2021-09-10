//constructor del producto
class productos{
    constructor(id, nombre, categoria, descripcion, precio, foto){
        this.id = id;
        this.nombre = nombre.toUpperCase();
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.precio = precio;
        this.foto = foto;
    }
}
//constructor de globales
let id;
let productosarray = [];
let categoriasarray = [];
let usersession;
let properties;

//OnLoad
function OnLoad(){  
    LoginCheck();
    LoadJSONProperties();
    ValidateProperties();
    DarkMode(document.getElementById('darkmode').checked);
    setTimeout(() => {Obtencion();}, 4000);
}


//Obtiene todos los valores por mas que cierre y vuelva a abrir el navegador por error o recargue para el muestreo en consola
function Obtencion(){
    if(JSON.parse(GetItems("productos")) != "" || JSON.parse(GetItems("categorias")) != ""){
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
                }else{
                    $("#tablaproductos").empty();
                    let content = `<td>Aun</td>
                    <td>No</td>
                    <td>Hay</td>
                    <td>Productos</td>
                    <td>Cargados</td>`;
                    $("#tablaproductos").append(content);

                    
                    $("#productoaeliminar").empty();
                    let content2 = `<option value="" id="SinProductos">Aun no hay Productos</option>`;
                    $("#productoaeliminar").append(content2);
            }
        }
    }

//Subida de producto -> faltan imagenes dinamicas en prox entrega si messi quiere
function UploadProducto(nombre, categoria, descripcion, precio, foto){
    console.log(foto);
    //check values for null input
    if(CheckProductForm()){

    if(productosarray == null){
        productosarray = [];
    }else{
        id = productosarray.length;
    }
    
    if(id == 0){
        productosarray.push(new productos(id, nombre, categoria, descripcion, precio, foto));
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
        productosarray.push(new productos(id, nombre, categoria, descripcion, precio, foto));
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
    if(document.getElementById('nombre').value == '' || document.getElementById('descripcion').value == '' || document.getElementById('precio').value == '' || document.getElementById('categoria').value == "Aun no hay categorias" || document.getElementById('categoria').value == "" || document.getElementById('foto').value == "")
    {
        ClearFormProductos();
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
        document.getElementById('foto').value = '';
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
function ExportJSONProductos(){

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

function ExportJSONCategorias(){

    if(categoriasarray.length == 0 ){
        alert("Aun no hay productos existentes que se puedan exportar");
    }else{
        //conversion de productos a JSON en otra variable
        let json = JSON.stringify(categoriasarray);
    
        //conversion JSON string a BLOB ->  fichero de  datos planos inmutables.
        json = [json];
        let blob1 = new Blob(json, { type: "text/plain;charset=utf-8" });
    
        //muchisima ayuda de stackoverflow por aca
        //Check the Browser.
        let isIE = false || !!document.documentMode;
        if (isIE) {
            window.navigator.msSaveBlob(blob1, "categorias.json");
        } else {
            let url = window.URL || window.webkitURL;
            link = url.createObjectURL(blob1);
            let a = document.createElement("a");
            a.download = "categorias.json";
            a.href = link;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            }
        }  
    }



//DARKMODE
function DarkMode(checked){
    if(checked){
        $("body").css("background-color", "#000000");
        $("#particles-js").css("background-color", "#000000")
    }else{

        $("body").css("background-color", "#ffffff");
        $("#particles-js").css("background-color", "#ffffff")
    }
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
        MuestreoProductos();
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
        MuestreoCategorias();
    });
}

//Testing
function LoadJSON(){
    LoadJSONCategorias();
    LoadJSONProductos();
}

function EraseExistence(){
    productosarray = [];
    categoriasarray = [];
    orden = []
    total = 0
    SaveItems("productos", JSON.stringify(productosarray));
    SaveItems("categorias", JSON.stringify(categoriasarray));
    SaveItems("total", total);
    SaveItems("orden", JSON.stringify(orden));
    MuestreoCategorias();
    MuestreoProductos();
}

function ValidateProperties(){
    setTimeout(function(){
    if(properties[0].BarName != null){SaveItems("BarName", JSON.stringify(properties[0].BarName))}else{SaveItems("BarName", JSON.stringify("DevBar"))}
    $("#brand").text(JSON.parse(GetItems("BarName"))+ " - Console");
      for (let index = 0; index < properties.length; index++) {
          if(properties[index].LoadFromJSON){LoadJSON();}}
              
        }, 1000)
  }