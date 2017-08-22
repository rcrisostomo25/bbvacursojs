class UserController {
	constructor(navigation) {
		this._navigation = navigation;
		this._apiClient = new ApiClient();
		this._userApiClient = new UserApiClient(this._apiClient);
	}
	
	validarAutenticacion() {
		let recordar = localStorage.getItem("recordar");
		if(recordar != null) {
			this._navigation.invocarNavegacion("#principal");
		} else {
			this._navigation.invocarNavegacion("#login");
		}
	}

	validarLogin(txtUsername, txtPassword) {
		this._userApiClient.autenticar(txtUsername, txtPassword)
			.then((data) => {
				console.log("PASOO")
	            this._navigation.invocarNavegacion("#principal");
	        }).catch((e) => {
	            console.log("ERROR");
	        });
	}

	crearUsuario(user) {
		this._userApiClient.crearUsuario(user)
			.then((data) => {
				console.log("PASOO")
	            this._navigation.invocarNavegacion("#login");
	        }).catch((e) => {
	            console.log("ERROR");
	        });
	}
}

class User {
	constructor(email, apellidos, nombre, username, password) {
		this._email = email;
		this._apellidos = apellidos;
		this._nombre = nombre;
		this._username = username;
		this._password = password;
	}
}