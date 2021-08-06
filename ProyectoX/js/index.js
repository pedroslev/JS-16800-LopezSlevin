//Global ones
let productosarray = [];
let categoriasarray = [];

function GetItems(clave){
    return localStorage.getItem(clave);
}

function MuestreoProds(){
    productosarray = JSON.parse(GetItems("productos"));
    categoriasarray = JSON.parse(GetItems("categorias"));

    
for (let index = 0; index < productosarray.length; index++) {
    if(productosarray[index] != undefined){
    let content = '<div class="card" style="width: 15rem;margin-left: 0.5rem;margin-bottom:0.5rem;">'+
    '<img class="card-img-top" src="./media/hamburguesa.jpg" alt="Card image cap">'+
    '<div class="card-body">'+
      '<h6 class="card-title">'+ productosarray[index].nombre +'</h6>'+
      '<p class="card-text">'+ productosarray[index].descripcion +'</p>'+
      '<p class="card-text"> $'+ productosarray[index].precio +'</p>'+
      '<div class="form-group mx-sm-4 mb-2">'+
        '<input type="Number" class="form-control" id="cantidad" placeholder="Cantidad">'+
      '</div>'+
      '<input type="hidden" id="idprod" value="'+ productosarray[index].id +'">'+
      '<button type="button" class="btn btn-primary" style="margin-left:3rem;">Ordenar</button>'+
    '</div>'+
  '</div>';
  $("#contenedor").append(content)
    }
    
}


}

