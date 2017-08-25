class BebidaPage extends InnerPage {
	constructor(container, apiClient) {
		super("Bebidas","#bebida",container);
		this._apiClient = apiClient;
		this._bebidaApiClient = new BebidaApiClient(this._apiClient);
        this._isMenu = true;
        this._icon = "fa-beer";	
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
            this.generarEventoBuscarTexto();
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

        if(data.length > 0 ) {
            for (let i = 0; i < data.length; i++) {
                let bebida = data[i];
                let row = this.getRowForBebida(bebida, i+1);
                tbody.appendChild(row);
            }
        } else {
            this._divRowBody.querySelector("#panelBody").innerHTML = "No se encontraron resultados.";
        }
    }

    getRowForBebida(bebida, i) {
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
        btnVer.addEventListener("click", () => this.generarEventoVerBebida(bebida, i));
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

                if(Validator.validarCamposObligatorios("formCrearBebida", true) && 
                        Validator.validarLongitudCampos("formCrearBebida", true)) {
                    let bebida = new Bebida(null, nombre, existencias, calorias, precio, esAlcoholica, grados);

                    this._bebidaApiClient.crearBebida(bebida)
                        .then((data) => {
                            this.listarBebidas();
                            GestorPageHtml.closeModal();
                        }).catch((e) => {
                            GestorPageHtml.closeModal();
                            GestorPageHtml.mensajeError("No se registró la bebida. Ocurrió un error " +
                                    "inesperado, inténtelo mas tarde!");
                        });
                }
							
			});
    	});
    }

    generarEventoVerBebida(bebida, i) {
    	this._bebidaApiClient.obtenerBebida(bebida._id)
            .then((data) => {
    			//GestorPageHtml.openModal(GestorPageHtml.estructuraVerBebida(bebida), "Ver datos Bebida", "primary");
                let table = new Table("#tableResultados");
                table._cuerpoRow = GestorPageHtml.estructuraVerBebida_row(data);
                table.agregarRowDetalle(i);

            }).catch((e) => {      
                GestorPageHtml.mensajeError("No se puede visualizar el detalle de la bebida. Ocurrió un error " +
                        "inesperado, inténtelo mas tarde!");
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
				
                if(Validator.validarCamposObligatorios("formEditarBebida", true) && 
                        Validator.validarLongitudCampos("formEditarBebida", true)) {
                    let objBebida = new Bebida(bebida._id, nombre, existencias, calorias, precio, esAlcoholica, grados);

                    this._bebidaApiClient.guardarBebida(objBebida)
                        .then((data) => {
                            this.listarBebidas();
                            GestorPageHtml.closeModal();
                            GestorPageHtml.mensajeSuccess("Bebida actualizada correctamente!");

                        }).catch((e) => {
                            GestorPageHtml.closeModal();
                            GestorPageHtml.mensajeError("No se actualizó la bebida. Ocurrió un error " +
                                    "inesperado, inténtelo mas tarde!");
                        });
                }					

			});

        });
    }

    generarEventoEliminarBebida(bebida) {
    	GestorPageHtml.openModal("¿Estás seguro que deseas eliminar?", "Eliminación", "danger");
    	
    	let btnEliminarBebida = document.body.querySelector("#btnSuccessModal");
		btnEliminarBebida.addEventListener("click", () => {
			this._bebidaApiClient.eliminarBebida(bebida._id)
                .then((data) => {
    				this.listarBebidas();	
    				GestorPageHtml.closeModal();
                    GestorPageHtml.mensajeSuccess("Bebida eliminada correctamente!");

            	}).catch((e) => {
                    GestorPageHtml.closeModal();
                    GestorPageHtml.mensajeError("No se eliminó la bebida. Ocurrió un error " +
                            "inesperado, inténtelo mas tarde!");
                });
		});    	
    }    
}