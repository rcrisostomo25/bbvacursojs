// Variable que almacena el ID del timeout
var timeoutID;
// Función que crea el timeout
function mostrarSaludoDentroDeDosSegundos() {
    timeoutID = window.setTimeout(slowAlert, 2000);
}
// Función que muestra un alert
function slowAlert() {
    alert("Hola !!");
}
// Llamamos a la función que crea el timeout
//mostrarSaludoDentroDeDosSegundos();

var intervalID;
var segundos = 0;
// Función que crea el timeout
function crearIntervaloDeUnSegundo() {
    intervalID = window.setInterval(imprimirAumentarTiempo, 1000);
}
// Función que muestra un alert
function imprimirAumentarTiempo() {
    segundos ++;
    console.log("Tiempo: " + segundos + " s.");
}
// Llamamos a la función que crea el timeout
//crearIntervaloDeUnSegundo();

function funcionalidadDeMiBoton(){
    alert("Acabas de hacer click en el botón.");
}

window.onload = function() {
    controlErrores();
}

function controlErrores() {
    try{
        // Definimos un JSON erroneo
        var jsonErroneo = "{ var: 123123, hola: ";

        throw "Ha ocurrido un error a proposito";
        // Tratamos de convertirlo a objeto (fallará)
        var json = JSON.parse(jsonErroneo);
        // Si no ha fallado nada deberíamos imprimir esta línea
        console.log("Hemos conseguido terminar el bloque try !!");
    }catch(e){
        console.log("No se ha podido ejecutar el bloque try !!");
        console.log("Excepcion:");
        console.log(e);
    }
}   