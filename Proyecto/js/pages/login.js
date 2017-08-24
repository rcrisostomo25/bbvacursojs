class Login extends Page {
	constructor(container, userController) {
		super("Iniciar Sesión","#login", container);
		this._userController = userController;		
	}

	pintarContenido() {
		this._container.innerHTML = "";

		this._divRowBody = document.createElement("div");
        this._divRowBody.className = "row";

        let estructura = GestorPageHtml.getEstructuraLogin();
        this._divRowBody.innerHTML = estructura;

        this._container.appendChild(this._divRowBody);
        this.generarEventoBotonesLogin();
    }

	generarEventoBotonesLogin() {
		let btnLogin = this._container.querySelector("#btnLogin");
		btnLogin.addEventListener("click",() => this.autenticacion());

		let btnCrearCuenta = this._container.querySelector("#btnCrearCuenta");
		btnCrearCuenta.addEventListener("click",() => this._navigation.invocarNavegacion("#crear-usuario")); 
	}

	autenticacion() {
		let txtUsername = this._container.querySelector("#txtUsername").value;
		let txtPassword = this._container.querySelector("#txtPassword").value;
		let chkRecordar = this._container.querySelector("#chkRecordar").checked;
		this._userController.validarLogin(txtUsername, txtPassword, chkRecordar);
	}
}