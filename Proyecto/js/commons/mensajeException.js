class MensajeException {
	constructor(error) {
		this._error = error;
		this._mensaje = null;
	}

	getMensaje() {
		try {
			let errorCode = this._error.code;
			let errorMessage = this._error.errmsg;
			if(errorMessage == null || errorMessage == undefined) {
				errorMessage = this._error.message;
			}

			if(errorMessage.indexOf("duplicate") != -1) {
				this._mensaje = "El registro ya existe, por favor ingrese otros datos.";

			} else if(errorMessage.indexOf("Failed to fetch") != -1) {
				this._mensaje = "Hubo un error de conexión. Por favor verifique.";

			} else if(errorMessage.indexOf("incorrecta") != -1) {
				this._mensaje = "La contraseña ingresada es incorrecta!";

			} else if(errorMessage.indexOf("User no encontrado") != -1) {
				this._mensaje = "El usuario ingresado no existe!";

			} else {
				this._mensaje = "Ocurrió un error inesperado, por favor intente nuevamente. Error code: " + errorCode;
			}

		} catch(e) {
			this._mensaje = "Ocurrió un error inesperado, por favor intente nuevamente."
		}

		return this._mensaje;	
	}
}