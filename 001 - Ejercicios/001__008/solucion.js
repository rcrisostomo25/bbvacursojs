/*

Escribe una función que reciba un string de números separados por dos puntos,
cree un array a partir del string y devuelva la media de todos lo valores

*/


// Tests

var stringDeNumeros = '80:70:90:100';
// La función debe devolver 85

// Bonus

// Misma funcionalidad pero eliminando los repetidos
var stringDeNumeros = '80:70:90:100:100:100:100';
// también deberá devolver 85

function obtenerMedia(cadenaNumeros) {
    var arrayNumeros = cadenaNumeros.split(":");
    var sumaNumeros = 0; 
    var objeto = {};

    for(var i=0; i< arrayNumeros.length; i++) {
        var elemento = arrayNumeros[i];
        if(!objeto[elemento]) {
            objeto[elemento] = elemento;
            sumaNumeros += parseInt(elemento);
        }         
    }

    return sumaNumeros / Object.getOwnPropertyNames(objeto).length;
}

console.log(obtenerMedia('80:70:90:100'));
console.log(obtenerMedia('80:70:90:100:100:100:100'));  