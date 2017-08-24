class Page {
	constructor(titulo, url, container) {
		this._titulo = titulo;
		this._url = url;
		this._autenticado = false;

		this._container = container;
        this._divRowBody = null;

        this._navigation = null;
	}
}

class Comida {
	constructor(id, nombre, existencias, calorias, precio, tipo) {
		this._id = id;
		this._nombre = nombre;
		this._existencias = existencias;
		this._calorias = calorias;
		this._precio = precio;
		this._tipo = tipo;
	}
} 

class Bebida {
	constructor(id, nombre, existencias, calorias, precio, esAlcoholica, grados) {
		this._id = id;
		this._nombre = nombre;
		this._existencias = existencias;
		this._calorias = calorias;
		this._precio = precio;
		this._esAlcoholica = esAlcoholica;
		this._grados = grados;
	}
}

class User {
	constructor(id, email, apellidos, nombre, username, password) {
		this._id = id;
		this._email = email;
		this._apellidos = apellidos;
		this._nombre = nombre;
		this._username = username;
		this._password = password;
	}

	quitarDeSession() {
		localStorage.removeItem("userSession");
	}

	obtenerDeSession() {
		let user = null;
		if(localStorage.getItem("userSession") != null) {
			user = JSON.parse(localStorage.getItem("userSession"));
		}
		return user;
	}

	colocarEnSession() {
		localStorage.setItem("userSession", JSON.stringify(this));
	}
}