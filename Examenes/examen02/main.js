
class Utilitario {
	constructor() {

	}

	static generarNumeroAleatorioEntre(minimo, maximo) {
	    let anchoFranjaNumerica = (maximo-minimo) + 1;
	    let numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);
	    return numero;
	}

	static generarNombreAleatorio(){
	    let nombres = ["Ronal", "Juan", "Marcel", "Christian", "Leo", "Fran", "Fabian", "Luis", "Andres"];
	    let indice = this.generarNumeroAleatorioEntre(0, nombres.length-1);

	    return nombres[indice];
	}

	static generarPaisAleatorio(){
	    let nombresPaises = ["Perú", "España", "Chile", "Colombia", "Mexico", "Argentina", "Bolivia", "Venezuela"];
	    let indice = this.generarNumeroAleatorioEntre(0, nombresPaises.length-1);

	    return nombresPaises[indice];
	}
}

class Soldado {
	constructor(tipo, potenciaAtaque) {
		this._nombre = Utilitario.generarNombreAleatorio();3
		this._salud = 100;
		this._potenciaAtaque = potenciaAtaque;
		this._tipo = tipo;
	}

	ataca(soldado) {
		soldado._salud -= this._potenciaAtaque;
		if(soldado._salud < 0) {
			soldado._salud = 0;
		}
	}
}

class SoldadoDeInfanteria extends Soldado {
	constructor() {
		super("I", Utilitario.generarNumeroAleatorioEntre(1,25));
	}
}

class SoldadoDeCaballeria extends Soldado {
	constructor() {
		super("C", Utilitario.generarNumeroAleatorioEntre(25,50));
	}
}

class SoldadoDeArtilleria extends Soldado {
	constructor() {
		super("A", Utilitario.generarNumeroAleatorioEntre(50,75));
	}
}

class SoldadoPilotoF18 extends Soldado {
	constructor() {
		super("F", Utilitario.generarNumeroAleatorioEntre(75,100));
	}
}

class Ejercito {
	constructor() {
		this._pais = Utilitario.generarPaisAleatorio();
		this._soldados = [];
		this._bajas = [];
	}

	crearEjercito() {
		this.generarSoldadosDeInfanteria(500);
		this.generarSoldadosDeCaballeria(200);
		this.generarSoldadosDeArtilleria(200);
		this.generarSoldadosPilotoF18(100);
	}

	generarSoldadosDeInfanteria(iteraciones) {
		for(let indice=0; indice < iteraciones; indice++) {
			let soldadoDeInfanteria = new SoldadoDeInfanteria();
			this._soldados.push(soldadoDeInfanteria);
		}
	}

	generarSoldadosDeCaballeria(iteraciones) {
		for(let indice=0; indice < iteraciones; indice++) {
			let soldadoDeCaballeria = new SoldadoDeCaballeria();
			this._soldados.push(soldadoDeCaballeria);
		}
	}

	generarSoldadosDeArtilleria(iteraciones) {
		for(let indice=0; indice < iteraciones; indice++) {
			let soldadoDeArtilleria = new SoldadoDeArtilleria();
			this._soldados.push(soldadoDeArtilleria);
		}
	}

	generarSoldadosPilotoF18(iteraciones) {
		for(let indice=0; indice < iteraciones; indice++) {
			let soldadoPilotoF18 = new SoldadoPilotoF18();
			this._soldados.push(soldadoPilotoF18);
		}
	}

	dameSoldadoAleatorio() {
		let indice = Utilitario.generarNumeroAleatorioEntre(0, this._soldados.length-1);
		return this._soldados[indice];
	}
}

class Guerra {
	constructor(ejercito1, ejercito2) {
		this._numeroJornadasTranscurridas = 0;
		this._ejercito1 = ejercito1;
		this._ejercito2 = ejercito2;
	}

	ejecutarCicloGuerra() {
		var ejercito1 = null;
		var ejercito2 = null;

		//ATAQUE ALEATORIO CADA EJECUCION
		if(Math.random() < 0.5) {
			ejercito1 = this._ejercito1;
			ejercito2 = this._ejercito2;
		} else {
			ejercito1 = this._ejercito2;
			ejercito2 = this._ejercito1;
		}

		this.ejecutarJornada(ejercito1, ejercito2);
		this.ejecutarJornada(ejercito2, ejercito1);
		this._numeroJornadasTranscurridas++;
		if(this._ejercito1._soldados.length == 0 || this._ejercito2._soldados.length == 0) {
			clearInterval(intervalID);
		}
	}

	ejecutarJornada(ejercito1, ejercito2) {
		for(let indiceSoldado=0; indiceSoldado<ejercito1._soldados.length; indiceSoldado++ ) {
			let soldado = ejercito1._soldados[indiceSoldado];
			if(ejercito2._soldados.length > 0) {
				let soldadoOponente = ejercito2.dameSoldadoAleatorio();
				soldado.ataca(soldadoOponente);

				if(soldadoOponente._salud <= 0) {
					ejercito2._bajas.push(soldadoOponente);
					ejercito2._soldados.splice(
							ejercito2._soldados.indexOf(soldadoOponente),1);
				}	
			}
		}
	}

	imprimirEstado() {
		console.log(":::::::::::::: CICLO GUERRA :::::::::::::::::");
		console.log("  NUMERO DE JORNADA EJECUTADAS: " + this._numeroJornadasTranscurridas);
		console.log("  NUMERO DE SOLDADOS VIVOS EN EJERCITO 1: " + this._ejercito1._soldados.length);
		console.log("  NUMERO DE SOLDADOS VIVOS EN EJERCITO 2: " + this._ejercito2._soldados.length);
		console.log("  BAJAS EJERCITO 1: " + this._ejercito1._bajas.length);
		console.log("  BAJAS EJERCITO 2: " + this._ejercito2._bajas.length);
	}
} 

//INICIALIZANDO EJERCITO 1
var ejercito1 = new Ejercito();
ejercito1.crearEjercito();

//INICIALIZANDO EJERCITO 2
var ejercito2 = new Ejercito();
ejercito2.crearEjercito();

//INICIALIZANDO GUERRA
var guerra = new Guerra(ejercito1, ejercito2);
var intervalID;

//EJECUTANDO INTERVALOS HASTA QUE UNO DE LOS EJERCITOS PIERDA
intervalID = setInterval(function(){
	guerra.ejecutarCicloGuerra();
	guerra.imprimirEstado();
},1000);
