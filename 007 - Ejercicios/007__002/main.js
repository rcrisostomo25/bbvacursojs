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

function Carrera(vehiculo1, vehiculo2) {
	this._vehiculo1 = vehiculo1;
	this._vehiculo2 = vehiculo2;
}

Carrera.prototype.iniciarCarrera = function() {
	var metrosVehiculo1 = getMetrosQueAvanzaCadaSegundo(this._vehiculo1._velocidadMaxima);
	var metrosVehiculo2 = getMetrosQueAvanzaCadaSegundo(this._vehiculo2._velocidadMaxima);
	this._vehiculo1._posicion += metrosVehiculo1;
	this._vehiculo2._posicion += metrosVehiculo2;
	console.log("Vehiculo 1: " + this._vehiculo1._posicion);
	console.log("Vehiculo 2: " + this._vehiculo2._posicion);

	var auto1 = document.getElementById("carro1");
	var auto2 = document.getElementById("carro2");
	auto1.setAttribute("style","margin-left: " + (this._vehiculo1._posicion*900/500) + "px");
	auto2.setAttribute("style","margin-left: " + (this._vehiculo2._posicion*900/500) + "px");
	
	if(this._vehiculo1._posicion >= 500 || this._vehiculo2._posicion >= 500 ) {
		if(this._vehiculo1._posicion  >= 500) {
			console.log("Gano vehiculo 1");
		} else {
			console.log("Gano vehiculo 2");
		}
		clearInterval(intervalID);
	}
}

var vehiculo1 = new Vehiculo();
var vehiculo2 = new Vehiculo();
var carrera = new Carrera(vehiculo1, vehiculo2);

var intervalID ;

window.onload = function() {
	var divCarro1 = document.createElement("div");
	var imgCarro1 = document.createElement("img");
	imgCarro1.setAttribute("id","carro1");
	imgCarro1.src = "./" + vehiculo1._imagen + ".png";
	divCarro1.appendChild(imgCarro1);

	var divCarro2 = document.createElement("div");
	var imgCarro2 = document.createElement("img");
	imgCarro2.setAttribute("id","carro2");
	imgCarro2.src = "./" + vehiculo2._imagen + ".png";
	divCarro2.appendChild(imgCarro2);

	var pista = document.getElementsByClassName("pista");
	pista[0].appendChild(divCarro1);
	pista[0].appendChild(divCarro2);

	intervalID = setInterval(function(){
		carrera.iniciarCarrera();
	},1000);
}


































