function OnLoad(){
    LoadJSONProperties();
    ValidateProperties();     
  }

  let orden = JSON.parse(localStorage.getItem("orden"));
  let precio = JSON.parse(localStorage.getItem("total"));
  new QRCode(document.getElementById("qrcode"), "http://192.168.0.237:5500/ProyectoX/facturacion.html?precio="+ precio);


  function ValidateProperties(){
    setTimeout(function(){
      if(properties[0].BarName != null){SaveItems("BarName", JSON.stringify(properties[0].BarName))}else{SaveItems("BarName", JSON.stringify("DevBar"))}
      if(properties[0].Slogan != null){SaveItems("Slogan", JSON.stringify(properties[0].Slogan))}else{SaveItems("Slogan", JSON.stringify("A bar made for developers by developers"))}
      $("#brand").text(JSON.parse(GetItems("BarName")));
      $("#slogan").text(properties[0].Slogan);
      }, 2500)
          
  }

  function GetItems(clave){
    return localStorage.getItem(clave);
}

//Guardado en localstorage de valores generico
function SaveItems(clave, valor){
  localStorage.setItem(clave, valor);
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