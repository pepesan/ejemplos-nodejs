function presentaAlerta(mensaje){
    $("#mensajes").html(mensaje);
}
function recoger(datos){
    console.log(datos);
    //window.history.back();
    presentaAlerta("<div class='alert alert-success'><strong>Success!</strong> Item saved!!!.</div>");
}
function recogerEdit(datos){
    console.log(datos);
    //window.history.back();
    presentaAlerta("<div class='alert alert-success'><strong>Éxito!</strong> Item Modificado!!!.</div>");
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
function editado(event){
    event.preventDefault();
    var objeto={    
    };
    objeto.nombre=$("#nombre").val();
    objeto.pass=$("#pass").val();
    objeto._id=$("#iden").val();
    $.post("/api/edit/"+objeto._id,objeto,recogerEdit)
        .fail(function(){
        console.log("petición fallida");
    });
}
function init(){
    console.log("DOM Cargado");
    $("#formu").submit(enviado);
    $("#formu-edit").submit(editado);
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
}
$(document).ready(init);


(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    
  }, false);
})();