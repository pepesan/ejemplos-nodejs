function gestionaRespuesta(datos){
    $("#listado").html("");
    $.each(datos,function(i,item){
        $("#listado").append("<li>"+item.username+"</li>");
    });
}
function init(){
    console.log("DOM Cargado");
    $.getJSON("getAll",gestionaRespuesta)
    .fail(function(){
        console.log("error");
    })
}
$(document).ready(init);