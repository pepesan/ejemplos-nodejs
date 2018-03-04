import $ from 'jquery';


function pideCosas(){
    $.getJSON(
        "http://localhost:3000/api/", 
        function(objeto){
            console.log(objeto);            
            $("body").append("<h1>"+objeto.propiedad+"</h1>")
        }
    );
    $.getJSON(
        "http://localhost:3000/api/libros/",
        function(libros){
            //hacer algo con los datos
            console.log(libros);
            var html="<ul>";
            for( var item of libros){               
                html+="<li>"+item.author+"</li>";
            }            
            html+="</ul>";           
            $("body").append(html);        
        }
    )
}
function envia(event){
    event.preventDefault();
    console.log("No envio el formulario");
    var user=$("#usuario").val();
    var pass=$("#password").val();
    var objetoAEnviar={
        usuario:user,
        password:pass
    };
    $.post("/api/login",objetoAEnviar,function(datosDevueltos){
       console.log(datosDevueltos);
        if(datosDevueltos.result==true){
            //DPM
            $("#mensajes").html("<h1>Logueado</h1>");
        }else{
            //fuck
            $("#mensajes").html("<h1>No Logueado</h1>");
        }
    });
}
function init(){
    console.log("Hola Navegador!");
    $("#pide").click(pideCosas);
    $("#login").submit(envia);
};
$(document).ready(init);