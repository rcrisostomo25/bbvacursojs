class Utilitario {
	constructor() {

	}

	static generarNumeroAleatorioEntre(minimo, maximo) {
	    let anchoFranjaNumerica = (maximo-minimo) + 1;
	    let numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);
	    return numero;
	}

	static dameAreas(){
	    let nombres = ["Urgencias", "Trauma", "UCI", "Reumas", "Rehab"];
	    return nombres;
	}

	static dameAreaAleatorio(){
	    let nombres = this.dameAreas();
	    let indice = this.generarNumeroAleatorioEntre(1, nombres.length-1);

	    return nombres[indice];
	}

	static obtenerFechaAleatoria() {
		var anio = this.generarNumeroAleatorioEntre(1989,2000);
		var mes = this.generarNumeroAleatorioEntre(0,11);
		var dia = this.generarNumeroAleatorioEntre(1,30);
		var fecha = new Date(anio, mes, dia);

		return fecha;
	}  
}

class Hospital {
	constructor() {
		this._areas = [];
		this._agenda = null;
	}

	trasladarPaciente(paciente) {
		var areaEncontrada = null;
		for(var indiceArea = 0; indiceArea < this._areas.length; indiceArea++ ) {
			if(this._areas[indiceArea]._especialidad = paciente._dolencia) {
				areaEncontrada = this._areas[indiceArea]; 
				break;
			}
		}

		areaEncontrada._pacientes.push(paciente);
		return areaEncontrada;
	}

	darDeAlta(paciente) {
		for(var indiceArea = 0; indiceArea < this._areas.length; indiceArea++ ) {
			var area = this._areas[indiceArea];
			if(area._pacientes.indexOf(paciente) != -1) {
				area._pacientes.splice(area._pacientes.indexOf(paciente) ,1);
				break;
			}
		}
	}

	getNumeroPacientes() {

	}

	getCapacidad() {

	}

	getAreasPorEspecialidad(especialidad) {
		var areaEncontrada = null;
		for(var indiceArea = 0; indiceArea < this._areas.length; indiceArea++ ) {
			if(this._areas[indiceArea]._especialidad = especialidad) {
				areaEncontrada = this._areas[indiceArea]; 
				break;
			}
		}

		return areaEncontrada;
	}
	
	recibirPaciente(paciente) {
		//Se asigna al area de urgencias
		let areaUrgencia = this._areas[0];
		areaUrgencia.insertarPaciente(paciente);

		return areaUrgencia;
	}

	inicializarAreasMedicos(fabricaPersonas) {
		for(let indiceArea =0; indiceArea < Utilitario.dameAreas; indiceArea++) {
			let especialidad = Utilitario.dameAreas[indiceArea];
			let area = new Area(especialidad);
			for(let indiceMedico=0; indiceMedico < 10; indiceMedico++) {
				let medico = fabricaPersonas.crearMedico();
				area._medicos.push(medico);
			}	
			this._areas.push(area);
		}
	}

	iniciarCicloUrgencias(fabricaPersonas, iteraciones) {
		//TODOS LOS NUEVOS A URGENCIAS
		for(var iter=0; iter < iteraciones; iter++) {
			let paciente = fabricaPersonas.crearPaciente(); 
			let areaUrgencia = this.recibirPaciente(paciente);

			let medico = areaUrgencia.getMedicoMasLibre(paciente);
			areaUrgencia.asignarMedico(paciente, medico);	
		}
	}

	ejecutarCicloTrasladoDeAreas() {
		var areaUrgencia = this._areas[0];
		for(var indicePaciente=0; indicePaciente < areaUrgencia._pacientes.length; indicePaciente++) {
			medico.diagnosticar(paciente);
			areaUrgencia.retirarPaciente(paciente);

			let nuevaArea = this.trasladarPaciente(paciente);
			let nuevoMedico = nuevaArea.getMedicoMasLibre(paciente);
			nuevaArea.asignarMedico(paciente, nuevoMedico);
		}	 
	}

	ejecutarCicloCuracion() {
		for(var indiceArea = 1; indiceArea < this._areas.length; indiceArea++ ) {
			var area = this._areas[indiceArea];
			area.atenderPacientes();
		}
	}
}

class Area {
	constructor(especialidad) {
		this._especialidad = especialidad;
		this._medicos = [];
		this._pacientes = [];
		this._capacidad = 50;
	}

	retirarPaciente(paciente) {
		this._pacientes.splice(this._pacientes.indexOf(paciente),1);
	}

	buscarMedico(paciente) {
		var medicoEncontrado = null;
		for(var indiceMedico=0; indiceMedico < this._medicos.length; indiceMedico++ ) {
			if(paciente._idMedico == this._medicos[indiceMedico]._idMedico) {
				medicoEncontrado = this._medicos[indiceMedico];
				break;
			}	
		}

		return medicoEncontrado;
	}

	asignarMedico(paciente, medico) {
		paciente._idMedico = medico._idMedico;
		medico._pacientes.push(paciente);
	}

	insertarPaciente(paciente) {
		this._pacientes.push(paciente);
	}

	getMedicoMasLibre() {
		var menorNumeroDePacientes = 9999;
		var posicionMedico = 0;

		for(var indiceMedico=0; indiceMedico < this._medicos.length; indiceMedico++) {
			if(this._medicos[indiceMedico]._pacientes.length < menorNumeroDePacientes) {
				menorNumeroDePacientes = this._medicos[indiceMedico]._pacientes.length;
				posicionMedico = indiceMedico;
			}
		}

		return this._medicos[posicionMedico];
	}

	atenderPacientes() {
		for(var iPaciente=0; iPaciente < this._pacientes.length; iPaciente++) {
			var paciente = this._pacientes[iPaciente];
			var medico = this.buscarMedico(paciente);
			medico.curar(paciente);
		}
	}
}

class Persona {
	constructor(id, dni, fechaNacimiento) {
		this._id = id;
		this._dni = dni;
		this._sexo = Math.random() < 0.5 ? "M" : "F";
		this._fechaNacimiento = fechaNacimiento;
	}
}

class Empleado extends Persona {
	constructor(id, dni, fechaNacimiento) {
		super(id, dni, fechaNacimiento);
		this._externo = false;
		this._turno = Math.random() < 0.5 ? "D" : "N";		
	}
}

class Paciente extends Persona {
	constructor(id, dni, fechaNacimiento) {
		super(id, dni, fechaNacimiento);
		this._estado = estado;
		this._peso = Utilitario.generarNumeroAleatorioEntre(50,90);
		this._altura = Utilitario.generarNumeroAleatorioEntre(120,200) / 100;
		this._idMedico = 0;
		this._salud = Utilitario.generarNumeroAleatorioEntre(0,50);
		this._dolencia = "";
	}

	getDolencia() {
		return Utilitario.dameAreaAleatorio();
	}

}

class Medico extends Empleado {
	constructor(id, dni, fechaNacimiento) {
		super(id, dni, fechaNacimiento);
		this._especialidad = "";
		this._pacientes = [];
	}

	curar(paciente) {
		paciente._salud += 10;
	}

	diagnosticar(paciente) {
		paciente._dolencia = paciente.getDolencia();
	}
}

class HistorialClinico {
	constructor(paciente) {
		this._paciente = paciente;
		this._registros = [];
	}

	crearRegistro(medico, anotacion) {
		var registro = new Registro(medico, anotacion);
	}
}

class ArchivoHistoriales {
	constructor() {
		this._historiales = [];
	}

	crearHistorial(paciente) {

	}

	getHistorial(paciente) {

	}
}

class Registro {
	constructor(anotacion, medico) {
		this._fecha = new Date();
		this._anotacion = anotacion;
		this._medico = medico;
	}
}

class FabricaPersonas {
	constructor() {
		this._ultimoId = 1;
	}

	crearMedico() {
		var medico = new Medico(this._ultimoId,"9999999", Utilitario.obtenerFechaAleatoria());
		this._ultimoId++;

		return medico;
	}

	crearPaciente() {
		var paciente = new Paciente(this._ultimoId,"9999999", Utilitario.obtenerFechaAleatoria());
		this._ultimoId++;

		return paciente;
	}
}

// -- INICIALIZANDO --
var fabricaPersonas = new FabricaPersonas();