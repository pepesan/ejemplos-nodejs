function gestionaRespuesta(datos){
    $("#listado").html("");
    $.each(datos,function(i,item){
        $("#listado").append("<li><a href='/api/show/"+item._id+"'>"+item.username+" (show/id)</a><br/><a href='/api/get/"+item._id+"'>(get/id)</a></li>");
    });
}
function init(){
    console.log("DOM Cargado");
    if($("#listado")){
        $.getJSON("getAll",gestionaRespuesta)
        .fail(function(){
            console.log("error");
        });
    }
}
$(document).ready(init);