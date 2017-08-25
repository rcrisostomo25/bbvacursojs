class UsuarioPage extends InnerPage {
	constructor(container, userController) {
		super("Usuarios","#usuario",container);
		this._userController = userController;
		this._isMenu = true;
		this._icon = "fa-user"; 
	}

	pintarContenido() {
		this._divRowBody = document.createElement("div");
        this._divRowBody.className = "row site-body";
        this._divRowBody.innerHTML = GestorPageHtml.getEstructuraEditarUsuario();

        this._userController.obtenerDatosUsuario(this._userController._user._id).then((data) => {
            this._divRowBody.querySelector("#txtEmail").value = data._email;
            this._divRowBody.querySelector("#txtApellidos").value = data._apellidos;
            this._divRowBody.querySelector("#txtNombre").value = data._nombre;
            this._divRowBody.querySelector("#txtUsername").value = data._username;            
            this.pintarPaginaCompleta();
            this.generarEventoBotonesPerfilUsuario();
            data._password = this._userController._user._password;
            this._userController._user = data;
        });
	}

	generarEventoBotonesPerfilUsuario() {
		let btnGuardarUsuario = this._container.querySelector("#btnGuardarUsuario");
		btnGuardarUsuario.addEventListener("click", () => {
			this.confirmacionGuardarUsuario();
		});

		let btnEliminarUsuario = this._container.querySelector("#btnEliminarUsuario");
		btnEliminarUsuario.addEventListener("click", () => {
			this.confirmacionEliminarUsuario();
		});
	}

	confirmacionGuardarUsuario() {
		GestorPageHtml.openModal("¿Está seguro de guardar los datos?","Confirmación","danger")
		let btnGuardarUsuario = document.body.querySelector("#btnSuccessModal");
		btnGuardarUsuario.addEventListener("click", () => {

			if(Validator.validarCamposObligatorios("formEditarUsuario", false) && 
                        Validator.validarLongitudCampos("formEditarUsuario", false)) {
				this._userController._user._email = this._divRowBody.querySelector("#txtEmail").value;
				this._userController._user._apellidos = this._divRowBody.querySelector("#txtApellidos").value;
				this._userController._user._nombre = this._divRowBody.querySelector("#txtNombre").value;
				this._userController._user._username = this._divRowBody.querySelector("#txtUsername").value;
				this._userController.guardarDatosUsuario();
			} else {
				GestorPageHtml.closeModal();
			}
			
		});
	}

	confirmacionEliminarUsuario() {
		GestorPageHtml.openModal("¿Está seguro que desea eliminar el usuario?","Confirmación","danger")
		let btnEliminarUsuario = document.body.querySelector("#btnSuccessModal");
		btnEliminarUsuario.addEventListener("click", () => {
			this._userController.eliminarUsuario(this._userController._user);			
		});
	}
}