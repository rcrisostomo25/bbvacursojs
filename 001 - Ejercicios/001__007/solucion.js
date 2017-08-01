/*

Realiza una función que reciba un array de números y devuelva cada par de posiciones
que al sumarlas devuelvan cero.

Por ejemplo:


// Posic:    0   1   2  3  4   5   6   7
var array = [2, -5, 10, 5, 4, -10, 0, -5];

Debe devolver:
[ "1,3" , "2,5" , "3,7", "6,6" ]

*/

var buscarParejas = function(array) {
    var arrayNuevo = [];

    for(var i=0; i < array.length; i++) {
        var elemento1 = array[i];
        var sumaNumeros = 0;

        for(var j=0; j < array.length; j++) {
            var elemento2 = array[j];
            sumaNumeros = elemento1 + elemento2;
            if(sumaNumeros == 0) {
                if(arrayNuevo.indexOf(j+","+i) == -1) {
                    arrayNuevo.push(i+","+j);
                }                  
            }   
        }   
    }   

    return arrayNuevo;
}

// Tests

var miArray = [2, -5, 10, 5, 4, -10, 0, -5];
console.log(buscarParejas(miArray));

// Debe imprimir [ "1,3" , "2,5" , "3,7", "6,6" ]