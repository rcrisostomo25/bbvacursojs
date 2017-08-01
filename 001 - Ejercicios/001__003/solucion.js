var array = [0, "Frase corta", "Frase normalita", "Frase muy muy larga"];

function devolverCantidadString(array) {
	var mayor = 0;
	var objeto = {
		texto : "",
		longitud: 0
	}		

	array.forEach(function(elemento) {
		if(typeof(elemento) == "string") {
			var mayorActual = elemento.toString().length;
			if(mayorActual > mayor) {
				mayor = mayorActual;
				objeto.texto = elemento;
				objeto.longitud = mayor;	
			}
		} else {
			console.error (elemento + " No es valor string");
		}
	});

	return objeto;
}	

console.log(devolverCantidadString(array));