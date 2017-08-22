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
}