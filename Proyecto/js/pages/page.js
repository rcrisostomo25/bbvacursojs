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
        this.generarEventoRecordar();
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
		this._userController.validarLogin(txtUsername, txtPassword);
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
	constructor(container, userController) {
		super("Crear cuenta", "#crear-usuario", container);
		this._userController = userController;
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
		let txtEmail = this._container.querySelector("#txtEmail").value;
		let txtApellidos = this._container.querySelector("#txtApellidos").value;
		let txtNombre = this._container.querySelector("#txtNombre").value;
		let txtUsername = this._container.querySelector("#txtUsername").value;
		let txtPassword = this._container.querySelector("#txtPassword").value;

		let user = new User(txtEmail, txtApellidos, txtNombre, txtUsername, txtPassword);
		this._userController.crearUsuario(user);
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
        menuHome.addEventListener("click", () => this._navigation.invocarNavegacion("#home"));

        let menuPage1 = this._container.querySelector("#menuPage1");
        menuPage1.addEventListener("click", () => this._navigation.invocarNavegacion("#comida"));

        let menuPage2 = this._container.querySelector("#menuPage2");
        menuPage2.addEventListener("click", () => this._navigation.invocarNavegacion("#bebida"));

        let menuPage3 = this._container.querySelector("#menuPage3");
        menuPage3.addEventListener("click", () => this._navigation.invocarNavegacion("#usuario"));

        let logout = this._container.querySelector("#logout");
        logout.addEventListener("click", () => this._navigation.invocarNavegacion("#login"));
	}
}

class Home extends InnerPage {
	constructor(container) {
		super("Home","#home",container);
	}

	pintarContenido() {
		this._divRowBody = document.createElement("div");
        this._divRowBody.className = "row site-body";
        this._divRowBody.innerHTML = "Home";

        this.pintarPaginaCompleta();
	}
}

class ComidaPage extends InnerPage {
	constructor(container, apiClient) {
		super("Comidas","#comida",container);
		this._apiClient = apiClient;
		this._comidaApiClient = new ComidaApiClient(this._apiClient);	
	}

	pintarContenido() {
		this._divRowBody = document.createElement("div");
        this._divRowBody.className = "row site-body";

        this.pintarEstructura();
        this._comidaApiClient.obtenerListaComidas().then((data) => {
            this.pintarComidas(data);
            this.pintarPaginaCompleta();
        });
	}

	pintarEstructura() {
        let estructura = GestorPageHtml.getEstructuraPanel(`<th>Nombre</th>
                                                            <th>Existencias</th>
                                                            <th>Calorias</th>
                                                            <th>Precio</th>
                                                            <th>Tipo</th>`);

        this._divRowBody.innerHTML = estructura.replace("$", "Comidas");
    }

	pintarComidas(data) {
        let tbody = this._divRowBody.querySelector("tbody");
        tbody.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
            let comida = data[i];
            let row = this.getRowForComida(comida);
            tbody.appendChild(row);
        }
    }

    getRowForComida(comida) {
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerHTML = comida._nombre;
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.innerHTML = comida._existencias;
        tr.appendChild(td2);

        let td3 = document.createElement("td");
        td3.innerHTML = comida._calorias;
        tr.appendChild(td3);

        let td4 = document.createElement("td");
        td4.innerHTML = comida._precio;
        tr.appendChild(td4);

        let td5 = document.createElement("td");
        td5.innerHTML = comida._tipo;
        tr.appendChild(td5);

        return tr;
    }
}

class BebidaPage extends InnerPage {
	constructor(container, apiClient) {
		super("Bebidas","#bebida",container);
		this._apiClient = apiClient;
		this._bebidaApiClient = new BebidaApiClient(this._apiClient);	
	}

	pintarContenido() {
		this._divRowBody = document.createElement("div");
        this._divRowBody.className = "row site-body";
        
        this.pintarEstructura();
        this._bebidaApiClient.obtenerListaBebidas().then((data) => {
            this.pintarBebidas(data);
            this.pintarPaginaCompleta();
        });
	}

	pintarEstructura() {
        let estructura = GestorPageHtml.getEstructuraPanel(`<th>Nombre</th>
                                                            <th>Existencias</th>
                                                            <th>Calorias</th>
                                                            <th>Precio</th>
                                                            <th>Alcoholica?</th>
                                                            <th>Grados</th>`);

        this._divRowBody.innerHTML = estructura.replace("$", "Bebidas");
    }

	pintarBebidas(data) {
        let tbody = this._divRowBody.querySelector("tbody");
        tbody.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
            let bebida = data[i];
            let row = this.getRowForBebida(bebida);
            tbody.appendChild(row);
        }
    }

    getRowForBebida(bebida) {
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerHTML = bebida._nombre;
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.innerHTML = bebida._existencias;
        tr.appendChild(td2);

        let td3 = document.createElement("td");
        td3.innerHTML = bebida._calorias;
        tr.appendChild(td3);

        let td4 = document.createElement("td");
        td4.innerHTML = bebida._precio;
        tr.appendChild(td4);

        let td5 = document.createElement("td");
        td5.innerHTML = bebida._esAlcoholica ? "SI" : "NO";
        tr.appendChild(td5);

        let td6 = document.createElement("td");
        td6.innerHTML = bebida._grados;
        tr.appendChild(td6);

        return tr;
    }
}

class UsuarioPage extends InnerPage {
	constructor(container, userController) {
		super("Usuarios","#usuario",container);
		this._userController = userController;
	}

	pintarContenido() {
		this._divRowBody = document.createElement("div");
        this._divRowBody.className = "row site-body";
        this._divRowBody.innerHTML = GestorPageHtml.getEstructuraEditarUsuario();

        this._userController.obtenerDatosUsuario("599c70b4e173ce04fa551604").then((data) => {
            this._divRowBody.querySelector("#txtEmail").value = data._email;
            this._divRowBody.querySelector("#txtApellidos").value = data._apellidos;
            this._divRowBody.querySelector("#txtNombre").value = data._nombre;
            this._divRowBody.querySelector("#txtUsername").value = data._username;
            console.log(this._divRowBody.querySelector("#txtUsername").value);
            this.pintarPaginaCompleta();
            console.log(this._divRowBody.querySelector("#txtUsername").value);
        });
	}
}

class Comida {
	constructor(nombre, existencias, calorias, precio, tipo) {
		this._nombre = nombre;
		this._existencias = existencias;
		this._calorias = calorias;
		this._precio = precio;
		this._tipo = tipo;
	}
} 

class Bebida {
	constructor(nombre, existencias, calorias, precio, esAlcoholica, grados) {
		this._nombre = nombre;
		this._existencias = existencias;
		this._calorias = calorias;
		this._precio = precio;
		this._esAlcoholica = esAlcoholica;
		this._grados = grados;
	}
} 
