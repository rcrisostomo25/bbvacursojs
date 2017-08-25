class CrearCuenta extends Page {
	constructor(container, userController) {
		super("Crear cuenta", "#crear-usuario", container);
		this._userController = userController;
		this._validator = new Validator();
	}

	pintarContenido() {
		this._container.innerHTML = "";

		this._divRowBody = document.createElement("div");
        this._divRowBody.className = "row";

        let estructura = GestorPageHtml.getEstructuraCrearUsuario();
        this._divRowBody.innerHTML = estructura;

        this._container.appendChild(this._divRowBody);

        this.generarEventoBotonesCrearCuenta();
	}

	generarEventoBotonesCrearCuenta() {
		let btnCrearCuenta = this._container.querySelector("#btnCrearCuenta");
		btnCrearCuenta.addEventListener("click",() => this.crearUsuario()); 

		let btnCancelar = this._container.querySelector("#btnCancelar");
		btnCancelar.addEventListener("click",() => this._navigation.invocarNavegacion("#login")); 
	}

	crearUsuario() {
		if(Validator.validarCamposObligatorios("formCrearUsuario", false) && 
				Validator.validarLongitudCampos("formCrearUsuario", false)) {

			let txtEmail = this._container.querySelector("#txtEmail").value;
			let txtApellidos = this._container.querySelector("#txtApellidos").value;
			let txtNombre = this._container.querySelector("#txtNombre").value;
			let txtUsername = this._container.querySelector("#txtUsername").value;
			let txtPassword = this._container.querySelector("#txtPassword").value;

			let user = new User(null, txtEmail, txtApellidos, txtNombre, txtUsername, txtPassword);
			this._userController.crearUsuario(user);
		}
	}
}