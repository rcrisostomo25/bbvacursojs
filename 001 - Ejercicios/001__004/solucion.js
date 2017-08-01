
var resultados = [];

var arrayDeTest1 = ["Richie", "Joanie", "Greg", "Marcia", "Bobby"];
var arrayDeTest2 = ["Blanka", "Zangief", "Chun Li", "Guile"];
var arrayDeTest3 = ["Red", "Blue", "Green"];
var arrayDeTest4 = ["Hola", "Frase corta", "Frase normalita", "Frase muy muy larga"];

function calculoLongitudMasLargo(array) {
	var mayor = 0;

	array.forEach(function(elemento) {
		if(typeof(elemento) == "string") {
			var mayorActual = elemento.toString().length;
			if(mayorActual > mayor) {
				mayor = mayorActual;	
			}
		} else {
			console.error (elemento + " No es valor string");
		}
	});

	resultados.push(mayor);
}

calculoLongitudMasLargo(arrayDeTest1);
calculoLongitudMasLargo(arrayDeTest2);
calculoLongitudMasLargo(arrayDeTest3);
calculoLongitudMasLargo(arrayDeTest4);

console.log(resultados);

function calcularMedia(array) {
	var total = 0;
	array.forEach(function(elemento) {
		total += elemento;
	});	

	return total / array.length;
}	

console.log(calcularMedia(resultados));

