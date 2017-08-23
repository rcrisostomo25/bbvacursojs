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
		this._container.innerHTML = "";

        let divCabecera = document.createElement("div");
		divCabecera.innerHTML = GestorPageHtml.getCabecera();
        this._container.appendChild(divCabecera);
	}

	pintarMenu() {
		let divMenu = document.createElement("div");
		divMenu.innerHTML = GestorPageHtml.getMenu();
        this._container.appendChild(divMenu);
    }

	pintarPieDePagina() {
		let divPiePagina = document.createElement("div");
		divPiePagina.innerHTML = GestorPageHtml.getPieDePagina();
        this._container.appendChild(divPiePagina);
	}

	pintarPaginaCompleta() {
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
        logout.addEventListener("click", () => {
        	localStorage.removeItem("userSession");
        	this._navigation.invocarNavegacion("#login");
        });
	}
}

class Home extends InnerPage {
	constructor(container, apiClient) {
		super("Home","#home",container);
		this._apiClient = apiClient;
		this._comidaApiClient = new ComidaApiClient(this._apiClient);
		this._bebidaApiClient = new BebidaApiClient(this._apiClient);	
	}

	pintarContenido() {
		GestorPageHtml.openBlock();

		this._divRowBody = document.createElement("div");
        this._divRowBody.className = "row site-body";

        let estructura = GestorPageHtml.getEstructuraGraficosComida();
        this._divRowBody.innerHTML = estructura;

        estructura = GestorPageHtml.getEstructuraGraficosBebida();
        this._divRowBody.innerHTML += estructura;

        this.pintarPaginaCompleta();
        this.cargarInformacionDeComidas();
          
	}

	cargarInformacionDeComidas() {
		this._comidaApiClient.obtenerListaComidas().then((data) => {
        	let totalExistencias = 0;
        	let arrayGraficoExistencias = [];
        	let arrayGraficoCalorias = [];
        	for(let indice = 0; indice < data.length; indice ++) {
        		let comida = {
            		y: data[indice]._calorias,
            		x: data[indice]._nombre
            	}
            	totalExistencias += data[indice]._existencias;
            	arrayGraficoCalorias.push(comida);
        	}
            for(let indice = 0; indice < data.length; indice ++) {
            	let valorPorcentual = parseInt(data[indice]._existencias * 100 / totalExistencias);
            	let comida = {
            		value: valorPorcentual,
            		label: data[indice]._nombre
            	}
            	arrayGraficoExistencias.push(comida);
            }

            this.pintarGraficoPie(arrayGraficoExistencias, "existencias");
            this.pintarGraficoBarras(arrayGraficoCalorias, "calorias");

            this.cargarInformacionDeBebidas();
        });
	}

	cargarInformacionDeBebidas() {
		this._bebidaApiClient.obtenerListaBebidas().then((data) => {
			let totalAlcoholicas = 0;
			let totalNoAlcoholicas = 0;
        	let arrayGraficoBebidasAlcoholicas = [];

        	for(let indice = 0; indice < data.length; indice ++) {
        		if(data[indice]._esAlcoholica) {
        			totalAlcoholicas++;
        		} else {
        			totalNoAlcoholicas++;
        		}
        	}

        	let objAlco = {
        		x: "Alcoholicas",
        		y: totalAlcoholicas
        	}
        	arrayGraficoBebidasAlcoholicas.push(objAlco);

        	let objNoAlco = {
        		x: "No Alcoholicas",
        		y: totalNoAlcoholicas
        	}
        	arrayGraficoBebidasAlcoholicas.push(objNoAlco);
        	this.pintarGraficoBarras(arrayGraficoBebidasAlcoholicas, "alcoholicas");
        	GestorPageHtml.closeBlock();
        });
	} 

	pintarGraficoPie(data, element) {
		 Morris.Donut({
		  element: element,
		  data: data,
		  formatter: function (x) { return x + "%"}
		}).on('click', function(i, row){
		  console.log(i, row);
		});
	}

	pintarGraficoBarras(data, element) {
		 Morris.Bar({
		  element: element,
		  data: data,
		  xkey: 'x',
		  ykeys: ['y'],
		  labels: ['Y'],
		  barColors: function (row, series, type) {
		    if (type === 'bar') {
		      var R = Math.floor((Math.random() * 256));
		      var G = Math.floor((Math.random() * 256));
		      return 'rgb(' + R + ','+ G +',0)';
		    }
		    else {
		      return '#000';
		    }
		  },
		  xLabelAngle: 35
		});
	}
}

class ComidaPage extends InnerPage {
	constructor(container, apiClient) {
		super("Comidas","#comida",container);
		this._apiClient = apiClient;
		this._comidaApiClient = new ComidaApiClient(this._apiClient);
		this._bebidaApiClient = new BebidaApiClient(this._apiClient);
	}

	pintarContenido() {
		this._divRowBody = document.createElement("div");
        this._divRowBody.className = "row site-body";

        this.pintarEstructura();
        this.pintarPaginaCompleta();
        this.listarComidas();
	}

	listarComidas() {
		this._comidaApiClient.obtenerListaComidas().then((data) => {
            this.pintarComidas(data);            
            this.generarEventoAgregarComida();
        });
	}

	pintarEstructura() {
        let estructura = GestorPageHtml.getEstructuraPanel(`<th>Nombre</th>
                                                            <th>Existencias</th>
                                                            <th>Calorias</th>
                                                            <th>Acciones</th>`);

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
        
        let btnVer = document.createElement("button");
        btnVer.className = "btn btn-primary btn-circle";
        btnVer.innerHTML = `<i class="fa fa-search"></i>`;
        btnVer.addEventListener("click", () => this.generarEventoVerComida(comida));
        td4.appendChild(btnVer);

        let btnEditar = document.createElement("button");
        btnEditar.className = "btn btn-warning btn-circle";
        btnEditar.innerHTML = `<i class="fa fa-pencil"></i>`;
        btnEditar.addEventListener("click", () => this.generarEventoEditarComida(comida));
        td4.appendChild(btnEditar);

        let btnEliminar = document.createElement("button");
        btnEliminar.className = "btn btn-danger btn-circle";
        btnEliminar.innerHTML = `<i class="fa fa-trash-o"></i>`;
        btnEliminar.addEventListener("click", () => this.generarEventoEliminarComida(comida));
        td4.appendChild(btnEliminar);

        tr.appendChild(td4);

        return tr;
    }

    generarEventoVerComida(comida) {
    	this._comidaApiClient.obtenerComida(comida._id).then((data) => {
			GestorPageHtml.openModal(GestorPageHtml.estructuraVerComida(comida), "Ver datos Comida", "primary");
        });
    }

    generarEventoEditarComida(comida) {
    	this._comidaApiClient.obtenerComida(comida._id).then((data) => {
			GestorPageHtml.openModal(GestorPageHtml.estructuraEditarComida(comida), "Edición Comida", "primary");

			let btnGuardarComida = document.body.querySelector("#btnSuccessModal");
			btnGuardarComida.addEventListener("click", () => {

				let tipo = document.body.querySelector("#txtTipo").value;
				let precio = document.body.querySelector("#txtPrecio").value;
				let calorias = document.body.querySelector("#txtCalorias").value;
				let existencias = document.body.querySelector("#txtExistencias").value;
				let nombre = document.body.querySelector("#txtNombre").value;
				let objComida = new Comida(comida._id, nombre, existencias, calorias, precio, tipo);

				this._comidaApiClient.guardarComida(objComida).then((data) => {
					this.listarComidas();
		            GestorPageHtml.closeModal();
		        });	

			});

        });
    }

    generarEventoEliminarComida(comida) {
    	GestorPageHtml.openModal("¿Estás seguro que deseas eliminar?", "Eliminación", "danger");
    	
    	let btnEliminarComida = document.body.querySelector("#btnSuccessModal");
		btnEliminarComida.addEventListener("click", () => {
			this._comidaApiClient.eliminarComida(comida._id).then((data) => {	
				this.listarComidas();	
				GestorPageHtml.closeModal();
        	});
		});    	
    }

    generarEventoAgregarComida() {
    	let btnAgregarComida = this._container.querySelector("#btnCrear");
    	btnAgregarComida.addEventListener("click", () => {
    		GestorPageHtml.openModal(GestorPageHtml.estructuraComida(),"Agregar","primary");
    		let btnGuardarComida = document.body.querySelector("#btnSuccessModal");
			btnGuardarComida.addEventListener("click", () => {

				let tipo = document.body.querySelector("#txtTipo").value;
				let precio = document.body.querySelector("#txtPrecio").value;
				let calorias = document.body.querySelector("#txtCalorias").value;
				let existencias = document.body.querySelector("#txtExistencias").value;
				let nombre = document.body.querySelector("#txtNombre").value;

				let comida = new Comida(null, nombre, existencias, calorias, precio, tipo);

				this._comidaApiClient.crearComida(comida).then((data) => {
					this.listarComidas();
		            GestorPageHtml.closeModal();
		        });				
			});
    	});
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
        this.pintarPaginaCompleta();
        this.listarBebidas();
	}

	listarBebidas() {
		this._bebidaApiClient.obtenerListaBebidas().then((data) => {
            this.pintarBebidas(data);
            this.generarEventoAgregarBebida();
        });
	}

	pintarEstructura() {
        let estructura = GestorPageHtml.getEstructuraPanel(`<th>Nombre</th>
                                                            <th>Existencias</th>
                                                            <th>Calorias</th>
                                                            <th>Acciones</th>`);

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
        
        let btnVer = document.createElement("button");
        btnVer.className = "btn btn-primary btn-circle";
        btnVer.innerHTML = `<i class="fa fa-search"></i>`;
        btnVer.addEventListener("click", () => this.generarEventoVerBebida(bebida));
        td4.appendChild(btnVer);

        let btnEditar = document.createElement("button");
        btnEditar.className = "btn btn-warning btn-circle";
        btnEditar.innerHTML = `<i class="fa fa-pencil"></i>`;
        btnEditar.addEventListener("click", () => this.generarEventoEditarBebida(bebida));
        td4.appendChild(btnEditar);

        let btnEliminar = document.createElement("button");
        btnEliminar.className = "btn btn-danger btn-circle";
        btnEliminar.innerHTML = `<i class="fa fa-trash-o"></i>`;
        btnEliminar.addEventListener("click", () => this.generarEventoEliminarBebida(bebida));
        td4.appendChild(btnEliminar);

        tr.appendChild(td4);

        return tr;
    }

    generarEventoAgregarBebida() {
    	let btnAgregarBebida = this._container.querySelector("#btnCrear");
    	btnAgregarBebida.addEventListener("click", () => {
    		GestorPageHtml.openModal(GestorPageHtml.estructuraBebida(),"Agregar Bebida","primary");
    		let btnGuardarComida = document.body.querySelector("#btnSuccessModal");
			btnGuardarComida.addEventListener("click", () => {
											
				let nombre = document.body.querySelector("#txtNombre").value;
				let existencias = document.body.querySelector("#txtExistencias").value;
				let calorias = document.body.querySelector("#txtCalorias").value;
				let precio = document.body.querySelector("#txtPrecio").value;
				let esAlcoholica = document.body.querySelector("#cboEsAlcoholica").value == 1 ? true : false;
				let grados = document.body.querySelector("#txtGrados").value;

				let bebida = new Bebida(null, nombre, existencias, calorias, precio, esAlcoholica, grados);

				this._bebidaApiClient.crearBebida(bebida).then((data) => {
					this.listarBebidas();
		            GestorPageHtml.closeModal();
		        });				
			});
    	});
    }

    generarEventoVerBebida(bebida) {
    	this._bebidaApiClient.obtenerBebida(bebida._id).then((data) => {
			GestorPageHtml.openModal(GestorPageHtml.estructuraVerBebida(bebida), "Ver datos Bebida", "primary");
        });
    }

    generarEventoEditarBebida(bebida) {
    	this._bebidaApiClient.obtenerBebida(bebida._id).then((data) => {
			GestorPageHtml.openModal(GestorPageHtml.estructuraEditarBebida(bebida), "Edición Bebida", "primary");

			let btnGuardarBebida = document.body.querySelector("#btnSuccessModal");
			btnGuardarBebida.addEventListener("click", () => {

				let nombre = document.body.querySelector("#txtNombre").value;
				let existencias = document.body.querySelector("#txtExistencias").value;
				let calorias = document.body.querySelector("#txtCalorias").value;
				let precio = document.body.querySelector("#txtPrecio").value;
				let esAlcoholica = document.body.querySelector("#cboEsAlcoholica").value == 1 ? true : false;
				let grados = document.body.querySelector("#txtGrados").value;
				
				let objBebida = new Bebida(bebida._id, nombre, existencias, calorias, precio, esAlcoholica, grados);

				this._bebidaApiClient.guardarBebida(objBebida).then((data) => {
					this.listarBebidas();
		            GestorPageHtml.closeModal();
		        });	

			});

        });
    }

    generarEventoEliminarBebida(bebida) {
    	GestorPageHtml.openModal("¿Estás seguro que deseas eliminar?", "Eliminación", "danger");
    	
    	let btnEliminarBebida = document.body.querySelector("#btnSuccessModal");
		btnEliminarBebida.addEventListener("click", () => {
			this._bebidaApiClient.eliminarBebida(bebida._id).then((data) => {	
				this.listarBebidas();	
				GestorPageHtml.closeModal();
        	});
		});    	
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
			this._userController._user._email = this._divRowBody.querySelector("#txtEmail").value;
			this._userController._user._apellidos = this._divRowBody.querySelector("#txtApellidos").value;
			this._userController._user._nombre = this._divRowBody.querySelector("#txtNombre").value;
			this._userController._user._username = this._divRowBody.querySelector("#txtUsername").value;
			this._userController._user._password = "12345678";
			this._userController.guardarDatosUsuario();
			GestorPageHtml.closeModal();
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

class Comida {
	constructor(id, nombre, existencias, calorias, precio, tipo) {
		this._id = id;
		this._nombre = nombre;
		this._existencias = existencias;
		this._calorias = calorias;
		this._precio = precio;
		this._tipo = tipo;
	}
} 

class Bebida {
	constructor(id, nombre, existencias, calorias, precio, esAlcoholica, grados) {
		this._id = id;
		this._nombre = nombre;
		this._existencias = existencias;
		this._calorias = calorias;
		this._precio = precio;
		this._esAlcoholica = esAlcoholica;
		this._grados = grados;
	}
} 
