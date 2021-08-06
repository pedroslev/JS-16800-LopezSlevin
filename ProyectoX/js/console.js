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
    }
}

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
    }
}

function MuestreoCategorias(){
    ClearSelectCategorias("categoria");
    ClearSelectCategorias("categoriaeliminar");
}

function MuestreoProductos(){
    ClearSelectProductos("productoaeliminar");
}

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

function ArrayDebug(array){
    for (let index = 0; index < array.length; index++) {
        console.log(array[index]);
    }
}

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

function ClearFormProductos(){
    document.getElementById('nombre').value = '';
        document.getElementById('descripcion').value = '';
        document.getElementById('precio').value = '';
}

function UploadCategorias(categoria){

    if(document.getElementById('nombrecategoria').value == ''){
        alert('No es posible cargar una categoria nula.');
        return;
    }else{
    categoriasarray.push(categoria)

    //debug
    ArrayDebug(categoriasarray);
    document.getElementById('nombrecategoria').value = '';
    SaveItems("categorias", JSON.stringify(categoriasarray));
    MuestreoCategorias();
    }
    
}

function DeleteCategorias(categoria){
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
}

function DeleteProducto(producto){
    let aux = 0
    if(document.getElementById('productoaeliminar')[0].textContent != document.getElementById('SinProductos')){
        for (let index = 0; index < productosarray.length; index++) {
            if(productosarray[index].nombre == producto){
                aux = index;
                delete productosarray[index];
            }
        }
        SaveItems("productos", JSON.stringify(productosarray));
        MuestreoProductos();
    }
}

function SaveItems(clave, valor){
    localStorage.setItem(clave, valor);
}

function LoginCheck(){
    usersession = localStorage.getItem('usersession');
    console.log(usersession);
    if(usersession == false){
        window.location.href = "restricted.html";
    }
    
}
