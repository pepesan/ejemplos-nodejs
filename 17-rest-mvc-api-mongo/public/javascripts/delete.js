function presentaAlertaBorrado(){
    presentaAlerta("<div class='alert alert-success'><strong>Éxito!</strong> Item Borrado</div>");
}
function borra(){
    $.get("/api/delete/"+this.getAttribute("data-id"),presentaAlertaBorrado)
        .fail(function(){
        console.log("petición fallida");
    });
}
function init(){
    $("#borrar").click(borra);
}
$(document).ready(init);