function recoger(datos){
    console.log(datos);
}
function enviado(event){
    event.preventDefault();
    var objeto={    
    };
    objeto.nombre=$("#nombre").val();
    objeto.pass=$("#pass").val();
    $.post("/api/add",objeto,recoger)
        .fail(function(){
        console.log("petición fallida");
    })
}
function init(){
    console.log("DOM Cargado");
    $("#formu").submit(enviado);
}
$(document).ready(init);