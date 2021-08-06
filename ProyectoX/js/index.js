//Global ones
let productosarray = [];
let categoriasarray = [];

function GetItems(clave){
    return localStorage.getItem(clave);
}

function MuestreoProds(){
    productosarray = JSON.parse(GetItems("productos"));
    categoriasarray = JSON.parse(GetItems("categorias"));
    
    let prevcard = document.getElementById("productos");
    let card = '<div class="card" style="width: 12rem;"><img class="card-img-top" src="./media/hamburguesa.jpg" alt="Card image cap"><div class="card-body"><h5 class="card-title">Hamburguesa</h5>    <p class="card-text">150gr de tapa arterias</p><div class="form-group mx-sm-3 mb-2"><input type="Number" class="form-control" id="cantidad" placeholder="Cantidad"></div><input type="hidden" id="idprod"><button type="button" class="btn btn-primary">Ordenar</button></div>'
    prevcard.append(card);

    //Necesito aprender a integrar una card entera con un appendchild o un proceso similar mas simple a generar un elemento por cada uno.


}

