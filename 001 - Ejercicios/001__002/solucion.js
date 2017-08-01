
function obtenerLetraDNI(numero)  {
	var retorno = "";
	var arraLetras = ["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];
	numero = concatenarCeros(numero,8);
	console.log(numero);
	
	if(numero < 0) {
		retorno = "Debes introducir un valor positivo";
	} else if(typeof numero != "number") {
		retorno = "Debes introducir un valor numerico";
	} else if(numero.lenght != 8) {
		retorno = "Debes introducir un número de 8 cifras";
	} else 	{
		retorno = "La letra es: " + arraLetras[(numero % 23)];
	}
	return retorno;
}

function concatenarCeros(value, length) {
    return (value.toString().length < length) ? concatenarCeros("0"+value, length):value;
}

console.log(obtenerLetraDNI(3456));
//ejercicio 2





