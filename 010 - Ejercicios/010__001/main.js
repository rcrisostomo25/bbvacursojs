
class Utilitario {
	constructor() {

	}

	static generarNumeroAleatorioEntre(minimo, maximo) {
	    var anchoFranjaNumerica = (maximo-minimo) + 1;
	    var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);
	    return numero;
	}

	static generarNacionalidadAleatorio(){
	    var nombresAutores = ["Peruano", "Colombiano", "Español", "Chileno", "Mexicano", "Argentino", "Brasileño"];
	    var indice = this.generarNumeroAleatorioEntre(0, nombresAutores.length-1);

	    return nombresAutores[indice];
	}

	static generarNombreAleatorio(){
	    var nombresAutores = ["Ronal", "Marcel", "Christian", "Bryan", "Fabian", "Daniel", "Carlos", "Juan", "Fran", "Luis", "Messi", "Ramos"];
	    var indice = this.generarNumeroAleatorioEntre(0, nombresAutores.length-1);

	    return nombresAutores[indice];
	}

	static generarPosicionAleatorio(){
	    var nombresAutores = ["portero", "defensa", "mediocentro", "atacante"];
	    var indice = this.generarNumeroAleatorioEntre(0, nombresAutores.length-1);

	    return nombresAutores[indice];
	}
}

class Persona {
	constructor() {
		this._nombre = Utilitario.generarNombreAleatorio();
		this._edad = Utilitario.generarNumeroAleatorioEntre(20,40);
		this._nacionalidad = Utilitario.generarNacionalidadAleatorio();
		this._altura = Utilitario.generarNumeroAleatorioEntre(150,200) / 100;
		this._peso = Utilitario.generarNumeroAleatorioEntre(60,120);
		this._enfermo = Math.random() <= 0.10 ? 1 : 0;
	}

}

class Jugador extends Persona {
	constructor() {
		super();
		this._posicion = Utilitario.generarPosicionAleatorio();
		this._numero = Utilitario.generarNumeroAleatorioEntre(1,90);
		this._calidad = Utilitario.generarNumeroAleatorioEntre(40,100);
		this._titular = 0;
		this._posicionEnCancha = "";
	}

	serTitular(equipo, posicion) {
		this._titular = 1;
		this._posicionEnCancha = posicion;
		equipo._alineacion._titulares.push(this);
	}
}   

class Equipo {
	constructor(entrenador) {
		this._entrenador = entrenador;
		this._jugadores = [];
		this._alineacion = new Alineacion();
		this._goles = 0;
		this._partidosGanamos = 0;
	}

	obtenerJugadorAleatorio() {
		let indiceAleatorio = Utilitario.generarNumeroAleatorioEntre(0,21);
		let jugadorAleatorio = this._jugadores[indiceAleatorio];
		if(jugadorAleatorio._enfermo == 1 || jugadorAleatorio._titular == 1) {
			jugadorAleatorio = this.obtenerJugadorAleatorio();
		}
 		return jugadorAleatorio;
	}

	obtenerJugadoresPorPosicion(posicion) {
		let arrayJugadores = [];

		for(let indiceJugador=0; indiceJugador < this._jugadores.length; indiceJugador++) {
			let jugador =  this._jugadores[indiceJugador];
			if(jugador._posicion == posicion && jugador._titular == 0 && jugador._enfermo == 0) {
				arrayJugadores.push(jugador);
			}
 		}

 		arrayJugadores.sort(function(a, b) {
		    return parseFloat(b._calidad) - parseFloat(a._calidad);
		});

 		return arrayJugadores;
	}

	crearPlantilla() {
		for(let j = 0; j < 22; j++ ) {
			var jugador = new Jugador();
			this._jugadores.push(jugador);
		}
	}
}

class Alineacion {
	constructor() {
		this._titulares = [];
	}

	obtenerSumaDeCalidadPorPosicion(posicion) {
		var sumaDeCalidad = 0;
		for(let indiceAlineacion=0; indiceAlineacion < this._titulares.length; indiceAlineacion++) {
			let jugador =  this._titulares[indiceAlineacion];
			if(jugador._posicionEnCancha == posicion) {
				sumaDeCalidad += jugador._calidad;
			}
 		}

 		return sumaDeCalidad;
	}

	cantidadDeJugadoresNoEnPuesto(posicion) {
		var cantidad = 0;
		for(let indiceAlineacion=0; indiceAlineacion < this._titulares.length; indiceAlineacion++) {
			let jugador =  this._titulares[indiceAlineacion];
			if(jugador._posicionEnCancha == posicion) {
				if(jugador._posicion != posicion) {
					cantidad ++;
				}	
			}
 		}
 		return cantidad;
	}
}

class Entrenador extends Persona {
	constructor(formacion) {
		super();
		this._formacion = formacion;
	}

	elegirPlantillaParaPartido(equipo) {
		var posiciones = this._formacion.split("-");

		this.asignarJugadoresPorPosicion(equipo, "portero", posiciones[0]);
		this.asignarJugadoresPorPosicion(equipo, "defensa", posiciones[1]);
		this.asignarJugadoresPorPosicion(equipo, "mediocentro", posiciones[2]);
		this.asignarJugadoresPorPosicion(equipo, "atacante", posiciones[3]);
	}

	asignarJugadoresPorPosicion(equipo, posicion, cantidad) {
		//Defensas
		var jugadores = equipo.obtenerJugadoresPorPosicion(posicion);
		if(jugadores.length > 0) {
			var cantidadRecorrer = 0;
			if(cantidad <= jugadores.length) {
				cantidadRecorrer = cantidad;
			} else {
				cantidadRecorrer = jugadores.length;
			}
			for(var indice=0; indice < cantidadRecorrer; indice++) {
				var jugador = jugadores[indice];
				jugador.serTitular(equipo,posicion);
			}
			if(cantidad - jugadores.length > 0) {
				for(var i = 0; i < cantidad - jugadores.length; i++) {
					var jugador = equipo.obtenerJugadorAleatorio();
					jugador.serTitular(equipo, posicion);
				}
			}
		} else {
			for(var i = 0; i < cantidad; i++) {
				var jugador = equipo.obtenerJugadorAleatorio();
				jugador.serTitular(equipo, posicion);
			}
		}
	}
}

class Partido {
	constructor(equipo1, equipo2) {
		this._equipo1 = equipo1;
		this._equipo2 = equipo2;
 	}

 	jugarPartido(iteraciones) {
 		for(var i=0; i < iteraciones; i++) {
 			this.ejecutarCicloPartido(this._equipo1, this._equipo2);
 			this.ejecutarCicloPartido(this._equipo2, this._equipo1);
 		}

 		if(this._equipo1._goles > this._equipo2._goles){
 			this._equipo1._partidosGanamos++;
 		} else {
 			this._equipo2._partidosGanamos++;
 		}
 	}

 	jugarVariosPartidos(iteraciones) {
 		for(var i=0; i < iteraciones; i++) {
 			this.jugarPartido(10);
 		}
 	}

 	ejecutarCicloPartido(equipo1, equipo2) {
 		
		let A = 0;
		let B = 0;
		let C = 0;
		let fortuna = Utilitario.generarNumeroAleatorioEntre(200,300);
		let total = 0;

		//Calcular A del equipo 1
		A = equipo1._alineacion.obtenerSumaDeCalidadPorPosicion("mediocentro") - 
				equipo2._alineacion.obtenerSumaDeCalidadPorPosicion("mediocentro");

 		//Calculo B del equipo1;
 		B = equipo1._alineacion.obtenerSumaDeCalidadPorPosicion("delantero") - 
				equipo2._alineacion.obtenerSumaDeCalidadPorPosicion("defensa");

		//Calucolo C
		C = A + B - equipo2._alineacion.obtenerSumaDeCalidadPorPosicion("portero"); 

		//Porteros
		var cantidadDeJugadoresNoEnPuesto = 0;
		cantidadDeJugadoresNoEnPuesto += equipo1._alineacion.cantidadDeJugadoresNoEnPuesto("portero");
		cantidadDeJugadoresNoEnPuesto += equipo1._alineacion.cantidadDeJugadoresNoEnPuesto("defensa");
		cantidadDeJugadoresNoEnPuesto += equipo1._alineacion.cantidadDeJugadoresNoEnPuesto("mediocentro");
		cantidadDeJugadoresNoEnPuesto += equipo1._alineacion.cantidadDeJugadoresNoEnPuesto("atacante");

		C = C - 10*(cantidadDeJugadoresNoEnPuesto);

		cantidadDeJugadoresNoEnPuesto = 0;
		cantidadDeJugadoresNoEnPuesto += equipo2._alineacion.cantidadDeJugadoresNoEnPuesto("portero");
		cantidadDeJugadoresNoEnPuesto += equipo2._alineacion.cantidadDeJugadoresNoEnPuesto("defensa");
		cantidadDeJugadoresNoEnPuesto += equipo2._alineacion.cantidadDeJugadoresNoEnPuesto("mediocentro");
		cantidadDeJugadoresNoEnPuesto += equipo2._alineacion.cantidadDeJugadoresNoEnPuesto("atacante");

		C = C + 10*(cantidadDeJugadoresNoEnPuesto);
		total = C + fortuna;

		if(total > 0) {
			equipo1._goles++;
		} 	
 	}

 	resultados() {
 		console.log("RESULTADOS::::");
 		console.log("REAL MADRID: " + this._equipo1._partidosGanamos);
 		console.log("BARCELONA " + this._equipo2._partidosGanamos);
 	}

}

class EntrenadoDefensivo extends Entrenador {
	constructor() {
		super("1-5-4-1");
	}
}

class EntrenadoAtacante extends Entrenador {
	constructor() {
		super("1-4-3-3");
	}
}

var entrenador1 = new EntrenadoDefensivo();
var entrenador2 = new EntrenadoAtacante();

var equipo1 = new Equipo(entrenador1);
equipo1.crearPlantilla();

var equipo2 = new Equipo(entrenador2);
equipo2.crearPlantilla();

entrenador1.elegirPlantillaParaPartido(equipo1);
entrenador2.elegirPlantillaParaPartido(equipo2);

var partido = new Partido(equipo1, equipo2);
partido.jugarVariosPartidos(50);
partido.resultados();























