


function contadorDeCaracteres(nombreDeString) {
	var arrayDeCaracteres = nombreDeString.split("");

	var objeto = {};

	arrayDeCaracteres.forEach(function(elemento) {
		if(!objeto[elemento]) {
			objeto[elemento] = 0;	
		}		
		objeto[elemento] = objeto[elemento] + 1;
	});	

	return objeto;	
}

console.log(contadorDeCaracteres("abbabcbdbabdbdbabababcbcbab"));

resultadoContador = contadorDeCaracteres("abbabcbdbabdbdbabababcbcbab");
console.log( resultadoContador['a'] === 7);
console.log( resultadoContador.b === 14);
console.log( resultadoContador['c'] === 3);

console.log(contadorDeCaracteres("xyyyxyxyxzyxyzyxyxyasdfz"));

resultadoContador = contadorDeCaracteres("xyyyxyxyxzyxyzyxyxyasdfz");
console.log( resultadoContador.x === 7 );
console.log( resultadoContador['y'] === 10 );
console.log( resultadoContador.z === 3 );
console.log( resultadoContador['a'] === 1 );
console.log( resultadoContador['s'] === 1 );
console.log( resultadoContador.d === 1 );
console.log( resultadoContador['f'] === 1 );