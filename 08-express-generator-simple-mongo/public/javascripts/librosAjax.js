$(document).ready(function () {
    console.log("Dom CARGADO");
    $("#recarga").click(function () {
        $.getJSON(
            "http://localhost:3000/libros",
            function (data) {
                // console.log(data);
                for (var item of data){
                    // console.log(item);
                    $("#resultados").append(
                        "<li>"+item.titulo+"</li>"
                    );
                }
            },
            function (error) {
                console.log(error);
            }
            );
    });
});
