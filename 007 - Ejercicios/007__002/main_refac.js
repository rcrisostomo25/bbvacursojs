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
	this._puesto = 0;
	this._tiempo = 0;
}

function Carrera(cantidad) {
	this._cantidad = cantidad;
	this._vehiculos = []; 
	this._vehiculosLlegados = [];
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
	var cantidadLlegados = 0;
	var laps = 0;

	for(var indiceVehiculo=0; indiceVehiculo < this._vehiculos.length; indiceVehiculo++ ) {
		vehiculo = this._vehiculos[indiceVehiculo];
		var tramoEnMetros = getMetrosQueAvanzaCadaSegundo(vehiculo._velocidadMaxima);
		vehiculo._posicion += tramoEnMetros;
		///vehiculo._velocidadMaxima += generarNumeroAleatorioEntre(-20,20);

		if(vehiculo._posicion >= 500) {
			vehiculo._posicion = 500;
			cantidadLlegados++;
			vehiculo._tiempo = parseFloat(500 / (vehiculo._velocidadMaxima * 1000 / 3600)).toFixed(1);
			if(this._vehiculosLlegados.indexOf(vehiculo) == -1) {
				this._vehiculosLlegados.push(vehiculo);	
			}
		}

		var autoImg = document.getElementById("carro"+indiceVehiculo);
		autoImg.setAttribute("style","margin-left: " + (vehiculo._posicion*900/500) + "px");
	}

	if(cantidadLlegados == this._vehiculos.length) {
		console.log("Termino la carrera");
		clearInterval(intervalID);
		this.generarResultados();
	}
}

Carrera.prototype.generarResultados = function() {
	var tableResultados = document.createElement("table");
	var th = document.createElement("tr");
	var td = document.createElement("th");
	td.innerHTML = "Posición";
	th.appendChild(td);
	td = document.createElement("th");
	td.innerHTML = "Tiempo";
	th.appendChild(td);
	td = document.createElement("th");
	td.innerHTML = "Imagen";
	th.appendChild(td);
	td = document.createElement("th");
	td.innerHTML = "Marca";
	th.appendChild(td);
	td = document.createElement("th");
	td.innerHTML = "Modelo";
	th.appendChild(td);
	td = document.createElement("th");
	td.innerHTML = "Velocidad";
	th.appendChild(td);
	tableResultados.appendChild(th);

	var divResultados = document.getElementsByClassName("resultados");
	divResultados[0].appendChild(tableResultados);

	var trCarro = null;
	var tdCarro = null;
	var imgCarro = null;
	for(var indiceCarro=0; indiceCarro < this._vehiculosLlegados.length; indiceCarro++ ) {
		var vehiculo = this._vehiculosLlegados[indiceCarro];

		trCarro = document.createElement("tr");
		tdCarro = document.createElement("td");
		tdCarro.innerHTML = (indiceCarro+1);
		trCarro.appendChild(tdCarro);

		tdCarro = document.createElement("td");
		tdCarro.innerHTML = vehiculo._tiempo;
		trCarro.appendChild(tdCarro);

		tdCarro = document.createElement("td");
		imgCarro = document.createElement("img");
		imgCarro.src = "./" + vehiculo._imagen + ".png";
		imgCarro.setAttribute("style","width: 100px;height: 30px")
		tdCarro.appendChild(imgCarro);
		trCarro.appendChild(tdCarro);

		tdCarro = document.createElement("td");
		tdCarro.innerHTML = vehiculo._marca;
		trCarro.appendChild(tdCarro);

		tdCarro = document.createElement("td");
		tdCarro.innerHTML = vehiculo._modelo;
		trCarro.appendChild(tdCarro);
		
		tdCarro = document.createElement("td");
		tdCarro.innerHTML = vehiculo._velocidadMaxima;
		trCarro.appendChild(tdCarro);

		tableResultados.appendChild(trCarro);
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


































