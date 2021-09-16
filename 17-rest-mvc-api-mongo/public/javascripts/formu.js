function presentaAlerta(mensaje){
    $("#mensajes").html(mensaje);
}
function pausecomp(millis)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < millis);
}
function recoger(datos, mensaje){
    console.log(datos);
    //window.history.back();
    presentaAlerta(mensaje);
    pausecomp(2000);
    window.location.replace("http://localhost:3000/api/list");
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
    $.post(
      "/api/add", // url
      objeto, // datos
      // success
      recoger(objeto, "<div class='alert alert-success'><strong>Success!</strong> Item saved!!!.</div>")
    ).fail(function(){
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
function checkSamePassword() {
  var pass2 = document.getElementById("pass2");
  var pass = document.getElementById("pass");

  // Si hay (por lo menos) un archivo seleccionado
  if (pass.value!=pass2.value) {
       pass2.setCustomValidity("Las contraseñas deben coincidir");
       return;
  }
  // No hay incumplimiento de la restricción
  pass2.setCustomValidity("");
}

function registrar(event){
    event.preventDefault();
    var objeto={
    };
    objeto.nombre=$("#nombre").val();
    objeto.pass=$("#pass").val();
    $.post("/api/register",objeto,recoger(objeto, "<div class='alert alert-success'><strong>Success!</strong> Item saved!!!.</div>"))
        .fail(function(){
        console.log("petición fallida");
    })
}
function loguear(event){
    event.preventDefault();
    var objeto={
    };
    objeto.nombre=$("#nombre").val();
    objeto.pass=$("#pass").val();
    $.post(
      "/api/login",
      objeto,
      recoger(objeto,"<div class='alert alert-success'><strong>Success!</strong> Correct Login!!!.</div>")
    ).fail(function(){
        console.log("petición fallida");
    })
}
function init(){
    console.log("DOM Cargado");
    $("#formu").submit(enviado);
    $("#formu-edit").submit(editado);
    $("#register #pass2").change(checkSamePassword);
    $("#register").submit(registrar);
    $("#login").submit(loguear);
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
