function gestionaRespuestaShow(datos){
    console.log(datos);
    $('h1').html(datos.username);
    $('h2').html(datos.hash);
}
function init(){
    console.log("Log");
    if($("#show-title")){
        var id = $('#show-title').attr('data-id');
        console.log(id);
        $.getJSON("/api/get/"+id,gestionaRespuestaShow)
        .fail(function(){
            console.log("error");
        });
    }
}
$(document).ready(init);
