class Page {
	constructor(titulo, url, container) {
		this._titulo = titulo;
		this._url = url;
		this._autenticado = false;

		this._container = container;
        this._divRowBody = null;

        this._navigation = null;
	}
}

class Login extends Page {
	constructor(container) {
		super("Iniciar Sesión","#login", container);
	}

	pintarContenido() {
		this._container.innerHTML = "";

		this._divRowBody = document.createElement("div");
        this._divRowBody.className = "row";

        let estructura = GestorPageHtml.getEstructuraLogin();
        this._divRowBody.innerHTML = estructura;

        this._container.appendChild(this._divRowBody);
        this.generarEventoBotonesLogin();
        this.generarEventoRecordar();
	}

	generarEventoBotonesLogin() {
		let btnLogin = this._container.querySelector("#btnLogin");
		btnLogin.addEventListener("click",() => this._navigation.invocarNavegacion("#principal")); 

		let btnCrearCuenta = this._container.querySelector("#btnCrearCuenta");
		btnCrearCuenta.addEventListener("click",() => this._navigation.invocarNavegacion("#crear-usuario")); 
	}

	generarEventoRecordar() {
		let chkRecordar = this._container.querySelector("#chkRecordar");
		chkRecordar.addEventListener("click",() => this.recordarusuario(chkRecordar.checked)); 
	}

	recordarusuario(isChecked) {
		if(isChecked) {
			let txtUsuario = this._container.querySelector("#txtUsuario").value;
			let txtPassword = this._container.querySelector("#txtPassword").value;
			if(txtUsuario != '' && txtPassword != '') {
				let user = {
					user: txtUsuario,
					pass: txtPassword
				}
				localStorage.setItem("recordar", JSON.stringify(user));
			}
		} else {
			localStorage.setItem("recordar",null);
		}
	}
}

class CrearCuenta extends Page {
	constructor(container) {
		super("Crear cuenta", "#crear-usuario", container);
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
		let btnCancelar = this._container.querySelector("#btnCancelar");
		btnCancelar.addEventListener("click",() => this._navigation.invocarNavegacion("#login")); 
	}
}

class InnerPage extends Page {
	constructor(titulo, url, container) {
		super(titulo, url, container);
	}

	pintarCabecera() {
		let cabecera = GestorPageHtml.getCabecera();
        this._container.innerHTML = cabecera;
	}

	pintarMenu() {
		let menu = GestorPageHtml.getMenu();
        this._container.innerHTML += menu;
    }

	pintarPieDePagina() {
		let pieDePagina = GestorPageHtml.getPieDePagina();
        this._container.innerHTML += pieDePagina;
	}

	pintarPaginaCompleta() {
		document.body.setAttribute("style","background-color: #fff;");
		this.pintarCabecera();
		this.pintarMenu();
		this._container.appendChild(this._divRowBody);
		this.pintarPieDePagina();
		this.generarEventoLinkMenu();
	}

	generarEventoLinkMenu() {
		let menuHome = this._container.querySelector("#menuHome");
        menuHome.addEventListener("click", () => this._navigation.invocarNavegacion("#principal"));

        let menuPage1 = this._container.querySelector("#menuPage1");
        menuPage1.addEventListener("click", () => this._navigation.invocarNavegacion("#page-1"));

        let menuPage2 = this._container.querySelector("#menuPage2");
        menuPage2.addEventListener("click", () => this._navigation.invocarNavegacion("#page-2"));

        let menuPage3 = this._container.querySelector("#menuPage3");
        menuPage3.addEventListener("click", () => this._navigation.invocarNavegacion("#page-3"));
	}
}

class Home extends InnerPage {
	constructor(container) {
		super("Página principal","#principal",container);
	}

	pintarContenido() {
		this._divRowBody = document.createElement("div");
        this._divRowBody.className = "row site-body";
        this._divRowBody.innerHTML = "Home";

        this.pintarPaginaCompleta();
	}
}

class Page1 extends InnerPage {
	constructor(container) {
		super("Page 1","#page-1",container);
	}

	pintarContenido() {
		this._divRowBody = document.createElement("div");
        this._divRowBody.className = "row site-body";
        this._divRowBody.innerHTML = "Page 1";

        this.pintarPaginaCompleta();
	}
}

class Page2 extends InnerPage {
	constructor(container) {
		super("Psge 2","#page-2",container);
	}

	pintarContenido() {
		this._divRowBody = document.createElement("div");
        this._divRowBody.className = "row site-body";
        this._divRowBody.innerHTML = "Page 2";

        this.pintarPaginaCompleta();
	}
}

class Page3 extends InnerPage {
	constructor(container) {
		super("Page 3","#page-3",container);
	}

	pintarContenido() {
		this._divRowBody = document.createElement("div");
        this._divRowBody.className = "row site-body";
        this._divRowBody.innerHTML = "Page 3";

        this.pintarPaginaCompleta();
	}
}
