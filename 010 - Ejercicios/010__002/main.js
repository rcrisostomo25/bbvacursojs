
class Utilitario {
	constructor() {

	}

	static generarNumeroAleatorioEntre(minimo, maximo) {
	    var anchoFranjaNumerica = (maximo-minimo) + 1;
	    var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);
	    return numero;
	}

	static generarNombreAleatorio(){
	    var nombresAutores = ["Ronal", "Juan", "Marcel", "Christian", "Leo", "Fran", "Fabian"];
	    var indice = this.generarNumeroAleatorioEntre(0, nombresAutores.length-1);

	    return nombresAutores[indice];
	}
}

class ParqueNatural {
	constructor() {
		this._areas = [];
		this._parqueDeBomberos = null;
		this._cantidadAreas = 10;
	}

	crearAreas() {
		for(var indiceArea=0; indiceArea<this._cantidadAreas;indiceArea++) {
			var area = new Area("area " + (indiceArea + 1));
			area.crearArboles();
		}
	}

	dameAreaAleatorio() {
		var indice = Utilitario.generarNumeroAleatorioEntre(0, this._areas.length-1);
		return this._areas[indice];
	}

	crearVisitantes() {
		for(var v=0; v<100; v++) {
			var visitante = new Visitante();
			var area = this.dameAreaAleatorio();

			area._visitantes.push(visitante);
		}
	}

	ejecutarCiclo() {

	}
}

class Area {
	constructor() {
		this.nombre = "";
		this._arboles = [];
		this._visitantes = [];
		this._aforoMaximoPersona = 100;
		this._cantidadMaximaArborles = 100;
	}

	crearArboles() {
		for(var indiceArbol = 0; indiceArbol < this._cantidadMaximaArborles; indiceArbol++) {
			var arbol = new Arbol("arbol " + (indiceArbol+1));
			this._arboles.push(arbol);			
		}
	} 
}

class Arbol {
	constructor(nombre) {
		this._nombre = nombre;
		this._altura = Utilitario.generarNumeroAleatorioEntre(100,200) / 100;
	}
} 

class ParqueDeBomberos {
	constructor() {
		this._bomberos = [];
	}

	crearBomberos() {
		
	}
}

class Persona {
	constructor() {
		this._nombre = Utilitario.generarNombreAleatorio();
		this._edad = Utilitario.generarNumeroAleatorioEntre(20,40);
		this._altura = Utilitario.generarNumeroAleatorioEntre(150,200) / 100;
		this._peso = Utilitario.generarNumeroAleatorioEntre(60,120);
	}

}

class Bombero extends Persona {
	constructor() {
		super();
	}
}

class Visitante extends Persona {
	constructor() {
		super();
	}

	ejecutarCiclo() {

	}
}

