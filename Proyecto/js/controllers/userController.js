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
	            GestorPageHtml.mensajeSuccess("Usuario creado correctamente!");

	        }).catch((e) => {
	            GestorPageHtml.mensajeError("Ocurrió un error inesperado, por favor intente nuevamente.");
	        });
	}

	obtenerDatosUsuario(id) {
		let promise = this._userApiClient.obtenerUsuario(id).then((data) => {
            return data;
        });

        return promise;
	}

	guardarDatosUsuario() {
		this._userApiClient.guardarUsuario(this._user)
			.then((data) => {
				GestorPageHtml.mensajeSuccess("Usuario actualizado correctamente!");
	            GestorPageHtml.closeModal();

	        }).catch((e) => {
	        	GestorPageHtml.closeModal();
	            GestorPageHtml.mensajeError("No se actualizó el usuario. Ocurrió un error inesperado, " +
	            	"por favor inténtele mas tarde.");
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