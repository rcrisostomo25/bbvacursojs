class UserController {
	constructor(navigation, apiClient) {
		this._navigation = navigation;
		this._apiClient = apiClient;
		this._user = null;
		this._userApiClient = new UserApiClient(this._apiClient);
	}
	
	validarAutenticacion() {
		let userSession = localStorage.getItem("userSession");
		if(userSession != null && userSession != undefined && userSession != "undefined") {
			let user = JSON.parse(userSession);
			this.validarLogin(user._username, user._password, true);

		} else {
			this._navigation.invocarNavegacion("#login");
		}
	}

	validarLogin(txtUsername, txtPassword, isRecordar) {
		this._userApiClient.autenticar(txtUsername, txtPassword)
			.then((data) => {
				this._user = new User(data._id, data.email, data.apellidos, data.nombre, data.username, txtPassword);
				if(isRecordar) {
					this._user.colocarEnSession();
				}

	            this._navigation.invocarNavegacion("#home");

	        }).catch((e) => {
	            GestorPageHtml.mensajeError("Usuario o contraseña incorrecto!");
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

	guardarDatosUsuario() {
		this._userApiClient.guardarUsuario(this._user).then((data) => {
            console.log(data);
        });
	}

	eliminarUsuario(user) {
		this._userApiClient.eliminarUsuario(user)
			.then((data) => {
				this._user.quitarDeSession();
	            GestorPageHtml.closeModal();
	            this._navigation.invocarNavegacion("#login");

	        }).catch((e) => {
	        	GestorPageHtml.closeModal();
	            GestorPageHtml.mensajeError("Ocurrió un error inesperado, por favor inténtele mas tarde.");
	        });
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