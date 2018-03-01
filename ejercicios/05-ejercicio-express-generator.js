/*
1.- Crea un nuevo proyecto con el express-generator llamado ejercicio5
2.- Crea un nuevo router llamado api accesible desde la url /api
3.- Crea una nueva ruta /api/ que devuelva un objeto JSON con una propiedad con
el valor "Valor"
4.- Haz que la página principal del proyecto cargue el ficheor de jquery un
fichero llamado miscript.js
comprueba que tiene una función init y que se ejecuta correctamente en el
navegador
5.-  Haz que desde el navegador se haga una llamada ajax a la ruta /api/ y
presenta el dato dentro de un h1 al final del body
6.- Crea una nueva ruta llama /api/libros/ que devuelva un JSON con varios libros
Cada libro deberá disponer de dos campos: titulo y autor
7.- Llama desde la página principal a la ruta /api/libros/ y presenta los datos
en un ul-li al final de body
8.- Crea una nueva ruta llamada /formulario que presente un formulario con los
siguientes campos: usuario y contraseña
9.- Crea una nueva ruta llamada /api/login/ que reciba los datos via POST del
formulario del ejercicio 8 y compruebe si ambos datos son "admin". Si es correcto
devuelve un objeto JSON con una propiedad llamada result y true en el valor.
Sino devolverá false en result.
10.- Haz que cuando se envíe el formulario del ejercicio 8 haga una llamada AJAX
a la ruta /api/login con los datos del formulario. En el caso de que se haya
realizado el login correctamente (no devuelven true) saca un mensaje por pantalla
en un div indicando que el login es correcto. En caso contrario saca un mensaje
por pantalla en un div indicando que el login es incorrecto.

 */