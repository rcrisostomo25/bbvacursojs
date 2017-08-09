function generarNumeroAleatorioEntre(minimo, maximo){
    var anchoFranjaNumerica = (maximo-minimo) + 1;
    var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

    return numero;
}

function generarMarcaAleatorio(){
    var nombresAutores = ["Toyota", "BMW", "Kia", "Hyundai", "Mazda", "Audi", "Mercedez"];
    var indice = generarNumeroAleatorioEntre(0, nombresAutores.length-1);

    return nombresAutores[indice];
}

function generarModeloAleatorio(){
    var nombresAutores = ["Modelo 1", "Modelo 2", "Modelo 3", "Modelo 4", "Modelo 5", "Modelo 6", "Modelo 7"];
    var indice = generarNumeroAleatorioEntre(0, nombresAutores.length-1);

    return nombresAutores[indice];
}

function generarImagenAleatorio(){
    var nombresAutores = ["vehiculo1", "vehiculo2", "vehiculo3", "vehiculo4", "vehiculo5", "vehiculo6", "vehiculo7"];
    var indice = generarNumeroAleatorioEntre(0, nombresAutores.length-1);

    return nombresAutores[indice];
}

function getMetrosQueAvanzaCadaSegundo(velocidadEnKmh){
    var metros = velocidadEnKmh*1000/3600;
    return metros;
}

function Vehiculo() {
	this._marca = generarMarcaAleatorio();
	this._modelo = generarModeloAleatorio();
	this._velocidadMaxima = generarNumeroAleatorioEntre(100,200);
	this._imagen = generarImagenAleatorio();
	this._posicion = 0;
}

function Carrera(cantidad) {
	this._cantidad = cantidad;
	this._vehiculos = []; 
}

Carrera.prototype.iniciarCarrera = function() {
	for(var indice=0; indice<this._cantidad; indice++) {
		var vehiculoNuevo = new Vehiculo();
		this._vehiculos.push(vehiculoNuevo);

		var divCarro = document.createElement("div");
		var imgCarro = document.createElement("img");
		imgCarro.setAttribute("id","carro" + indice);
		imgCarro.src = "./" + vehiculoNuevo._imagen + ".png";
		var hr = document.createElement("hr");
		divCarro.appendChild(imgCarro);

		var pista = document.getElementsByClassName("pista");
		pista[0].appendChild(divCarro);
		pista[0].appendChild(hr);
	}
}

Carrera.prototype.ejecutarCiclo = function() {
	var vehiculo = null;
	var cantidadLlegados = 1;

	for(var indiceVehiculo=0; indiceVehiculo < this._vehiculos.length; indiceVehiculo++ ) {
		vehiculo = this._vehiculos[indiceVehiculo];
		vehiculo._posicion += getMetrosQueAvanzaCadaSegundo(vehiculo._velocidadMaxima);

		if(vehiculo._posicion >= 500) {
			vehiculo._posicion = 500;
			cantidadLlegados++;
		}

		var autoImg = document.getElementById("carro"+indiceVehiculo);
		autoImg.setAttribute("style","margin-left: " + (vehiculo._posicion*900/500) + "px");
	}

	if(cantidadLlegados == this._vehiculos.length) {
		console.log("Termino la carrera");
		clearInterval(intervalID);
	}
}

//INICIAMOS LA CARRERA 
var carrera = new Carrera(3);

var intervalID ;
window.onload = function() {
	carrera.iniciarCarrera();
	intervalID = setInterval(function(){
		carrera.ejecutarCiclo();
	},1000);
}


































