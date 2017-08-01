/*

Ejercicio 001__009: 
Realiza las funciones siguientes 

*/


// Esta función recibe un string y devuelve el string inverso
// Por ejemplo: para el string "Hola clase!" debe devolver "!esalc aloH"
function stringInverso(string) {
    var arrayString = string.split("");
    var stringInverso = "";

    for(var i=arrayString.length; i>0 ;i--) {
        stringInverso +=  arrayString[i-1];
    }

    return stringInverso;
}

console.log(stringInverso("Hola clase!"));

// Esta función debe recibir un string y devolver el mismo string sin espacios
function eliminarEspacios(string) {
    // Con expresión regular
    var cadena = string.replace(/\s/g, '');
    return cadena;
}

console.log(eliminarEspacios("Hola clase!"));

// Esta función debe recinir un string y devolverlo con todas sus letras mayúsculas
function ponerTodasLasLetrasMayusculas(string){
    return string.toUpperCase();
}

console.log(ponerTodasLasLetrasMayusculas("Hola clase!"));

// Esta función debe recibir un string y decir si es un palíndromo (true / false)
// Un palíndromo es una frase que se lee igual al derecho que al revés
// Haz uso de las tres funciones anteriores
function esPalindromo(string) {
    var esPalindromo = false;
    if(eliminarEspacios(string.toLowerCase()) == eliminarEspacios(stringInverso(string).toLowerCase())) {
        esPalindromo = true;
    } 
    return esPalindromo; 
}

console.log(esPalindromo("Arde ya la yedra"));

//  Ejemplos de palíndromos:

// Arde ya la yedra
// Ana lava lana
// Anita lava la tina

