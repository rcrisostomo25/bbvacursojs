/*

Ejercicio:

Completa las funciones siguientes para tener un conjunto de operaciones que 
traten nuestros arrays realizando diversas transformaciones sobre ellos.

Finalizado el ejercicio podrás probar que funciona correctamente con los tests del final.

Nota: puede que alguna de las siguientes funciones te sea de ayuda:

isFinite(), splice(), unshift(), push(), join(), sort(), Math.floor()

Puedes encontrar más en: https://developer.mozilla.org/en-US/docs/Web/JavaScript y http://www.w3schools.com/js/default.asp

*/


function vaciarPapelera(array) {
    // Esta función debe recibir un array y devolverlo habiéndole quitado los elementos que sean un asterisco (*)
    // Por ejeplo:
    // vaciarPapelera(['a',1,'*',5]) 
    // debe devolver:
    // ['a',1,5]
    var newArray = [];
    array.forEach(function(elemento) {
        if(elemento != '*') {
            newArray.push(elemento);
        }    
    });

    return newArray;
}

function agruparElementos(array) {
    // Esta función debbe recibir un array con números y letras y devolverlo habiendo agrupado los elementos
    // En primer lugar se deben encontrar números, depués letras. El orden dentro de cada grupo no importa.
    // Por ejemplo: 
    // agruparElementos(['B', 'a', 4 , 23, 'J']) 
    // debe devolver:
    // [23, 4, 'B', 'a', 'J']
    return array.sort();
}

function ponerBonitasLasLetras(array) {
    // Esta función debe recixbir un array de números y letras y devolverlo con las letras vocales en mayúsculas 
    // y las consonantes en minúsculas. Los números no deben ser tratados.
    // Por ejemplo:
    // ponerBonitasLasLetras([1,5,7,'a','J',p,'E'])
    // debe devolver:
    // [1,5,7,'A','j',p,'E']
    var arrayVocales = ['A','E','I','O','U'];
    
    for(var i = 0; i < array.length; i++ ) {
        var elemento = array[i];
        if(typeof(elemento) == 'string') {
            if(arrayVocales.indexOf(elemento.toString().toUpperCase()) != -1) {
                array.splice(i,1,elemento.toUpperCase());
            } else {
                array.splice(i,1,elemento.toLowerCase());    
            }
        }       
    }    

    return array;
}


function ponerBonitosLosNumeros(array) {
    // Esta función debe recibbir un array de números y letras, y devolverlo con los números "bonitos". 
    // Las letras no deben cambiar. 
    // Para poner bonito número debemos sumar todas sus cifras.
    // en caso de que el número resultante tenga más de una cifra, se petirá el proceso con este.
    // 123 se convertirá en 6 porque 1+2+3 = 6
    // 9 se convertirá en 9
    // 9956 se convertirá en 2 porque 9+9+5+6 = 29, 2+9 = 11 y 1+1 = 2
    // 793 se convertirá en 1 porque 7+9+3 = 19, 1+9 = 10 y 1+0 = 1
    // Este proceso debemos realizarlo sobre un array de elementos y aplicarlo solo a los números.
    for(var i=0; i < array.length; i++) {
        var elemento = array[i];
        if(typeof(elemento) == 'number') {
            if(elemento.length != 1) {
                var total = elemento;
                var caracteres = 0;  
                while(caracteres != 1) {
                    var totalLocal = 0;
                    var numeros = total.toString().split("");
                    numeros.forEach(function(num) {
                        totalLocal += parseInt(num);
                    });
                    caracteres = total.toString().length;
                    total = totalLocal;
                }        
                array.splice(i,1,total);
            }    
        }   
    }        

    return array;
}

function arrayToString(array) {
    //Esta función debe recibir un array y devolver un string con todos sus elementos
    //Ejemplo: arrayToString([1, 4, 5, 5, 'A', 'b', 'E', 'j']) dee devolver "1455AbEj"
     var string = "";
     array.forEach(function(elemento) {
        string += elemento+""; 
     });
     return string;
}

// Tests

function transformacionCompletaDelArray(array) {
    array = vaciarPapelera(array);
    array = agruparElementos(array);
    array = ponerBonitasLasLetras(array);
    array = ponerBonitosLosNumeros(array);
    array = arrayToString(array);

    return array;
}

//console.log(vaciarPapelera(['a',1,'*',5]));
//console.log(agruparElementos(['B', 'a', 4 , 23, 'J']));
//console.log(ponerBonitasLasLetras([1,5,7,'a','J','p','E']));
//console.log(ponerBonitosLosNumeros([9956,793,755,'a','J','p','E']));

console.log(transformacionCompletaDelArray(["a", 6, "B", "F", "*", 8, 78, "J"]) === "668bfjA");
console.log(transformacionCompletaDelArray(["*", "j", 6, "A", "F", "*", 8, "C", "b", "a", 78, "J", 43523, 1111, "r", "q", "y"]) === "48668AcfjAbjqry"); //48668AcfjAbjqry