class UserController {
	constructor(navigation, apiClient) {
		this._navigation = navigation;
		this._apiClient = apiClient;
		this._userApiClient = new UserApiClient(this._apiClient);
	}
	
	validarAutenticacion() {
		let recordar = localStorage.getItem("recordar");
		if(recordar != null) {
			this._navigation.invocarNavegacion("#home");
		} else {
			this._navigation.invocarNavegacion("#login");
		}
	}

	validarLogin(txtUsername, txtPassword) {
		this._userApiClient.autenticar(txtUsername, txtPassword)
			.then((data) => {
	            this._navigation.invocarNavegacion("#home");
	        }).catch((e) => {
	            console.log("ERROR");
	        });
	}

	crearUsuario(user) {
		this._userApiClient.crearUsuario(user)
			.then((data) => {
	            this._navigation.invocarNavegacion("#login");
	        }).catch((e) => {
	            console.log("ERROR");
	        });
	}

	obtenerDatosUsuario(id) {
		let promise = this._userApiClient.obtenerUsuario(id).then((data) => {
            return data;
        });

        return promise;
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
}