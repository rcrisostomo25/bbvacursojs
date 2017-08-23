class UserApiClient {
	constructor(apiClient) {
		this._baseURL = "http://formacion-indra-franlindebl.com/api/users";
		this._apiClient = apiClient;
	}

	autenticar(username, password) {
		let completeUrl = this._baseURL + "/login";

		let objetoUser = {
			username: username,
			password: password
		}

		let promise = this._apiClient.post(completeUrl, objetoUser);
		let anotherPromise = promise.then((data) => {
			console.log(data);
		});

		return anotherPromise;
	}

	crearUsuario(user) {
		let completeUrl = this._baseURL;

		let objetoUser = {
			email: user._email,
			apellidos: user._apellidos,
			nombre: user._nombre,
			username: user._username,
			password: user._password
		}

		let promise = this._apiClient.post(completeUrl, objetoUser);
		let anotherPromise = promise.then((data) => {
			console.log(data);
		});

		return anotherPromise;
	}

	obtenerListadoUsuarios() {
		let completeUrl = this._baseURL;

		let promise = this._apiClient.get(completeUrl, null);
		let anotherPromise = promise.then((data) => {
			let usuarios = [];
			for(let indice = 0; indice < data.length; indice ++) {
				let elemento = data[indice];

				let usuario = new User(elemento._id, elemento.email, elemento.apellidos, 
					elemento.nombre, elemento.username, null);
				usuarios.push(usuario);
			}

			return usuarios;
		});

		return anotherPromise;
	}

	obtenerUsuario(id) {
		let completeUrl = this._baseURL + "/" + id;

		let promise = this._apiClient.get(completeUrl, null);
		let anotherPromise = promise.then((data) => {
			let usuario = new User(data._id, data.email, data.apellidos, 
					data.nombre, data.username, null);
			return usuario;
		});

		return anotherPromise;
	}
}