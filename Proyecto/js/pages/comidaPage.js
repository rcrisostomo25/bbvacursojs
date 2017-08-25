class ComidaPage extends InnerPage {
	constructor(container, apiClient) {
		super("Comidas","#comida",container);
		this._apiClient = apiClient;
		this._comidaApiClient = new ComidaApiClient(this._apiClient);
        this._isMenu = true;	
        this._icon = "fa-gear"; 	
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
            this.generarEventoBuscarTexto();            
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

        if(data.length > 0 ) {
            for (let i = 0; i < data.length; i++) {
                let comida = data[i];
                let row = this.getRowForComida(comida, i+1);
                tbody.appendChild(row);
            }
        } else {
            this._divRowBody.querySelector("#panelBody").innerHTML = "No se encontraron resultados.";
        }
    }

    getRowForComida(comida, i) {
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
        btnVer.addEventListener("click", () => this.generarEventoVerComida(comida, i));
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

    generarEventoVerComida(comida, i) {
        
    	this._comidaApiClient.obtenerComida(comida._id)
            .then((data) => {
    			//GestorPageHtml.openModal(GestorPageHtml.estructuraVerComida(comida), "Ver datos Comida", "primary");
                let table = new Table("#tableResultados");
                table._cuerpoRow = GestorPageHtml.estructuraVerComida_row(data);
                table.agregarRowDetalle(i);

            }).catch((e) => {            
                let mensajeError = new MensajeException(e);
                GestorPageHtml.mensajeError(mensajeError.getMensaje());
            });
    }

    generarEventoEditarComida(comida) {
    	this._comidaApiClient.obtenerComida(comida._id).then((data) => {
			GestorPageHtml.openModal(GestorPageHtml.estructuraEditarComida(comida), "Edición Comida", "primary");

			let btnGuardarComida = document.body.querySelector("#btnSuccessModal");
			btnGuardarComida.addEventListener("click", () => {

				let tipo = document.body.querySelector("#cboTipo").value;
				let precio = document.body.querySelector("#txtPrecio").value;
				let calorias = document.body.querySelector("#txtCalorias").value;
				let existencias = document.body.querySelector("#txtExistencias").value;
				let nombre = document.body.querySelector("#txtNombre").value;

                if(Validator.validarCamposObligatorios("formEditarComida", true) && 
                        Validator.validarLongitudCampos("formEditarComida", true)) {
    				let objComida = new Comida(comida._id, nombre, existencias, calorias, precio, tipo);

    				this._comidaApiClient.guardarComida(objComida)
                        .then((data) => {
        					this.listarComidas();
        		            GestorPageHtml.closeModal();
                            GestorPageHtml.mensajeSuccess("Comida actualizada correctamente!");

        		        }).catch((e) => {
                            GestorPageHtml.closeModal();
                            let mensajeError = new MensajeException(e);
                            GestorPageHtml.mensajeError(mensajeError.getMensaje());
                        });
                }

			});

        });
    }

    generarEventoEliminarComida(comida) {
    	GestorPageHtml.openModal("¿Estás seguro que deseas eliminar?", "Eliminación", "danger");
    	
    	let btnEliminarComida = document.body.querySelector("#btnSuccessModal");
		btnEliminarComida.addEventListener("click", () => {
			this._comidaApiClient.eliminarComida(comida._id)
                .then((data) => {	
    				this.listarComidas();	
    				GestorPageHtml.closeModal();
                    GestorPageHtml.mensajeSuccess("Comida eliminada correctamente!");

            	}).catch((e) => {
                    GestorPageHtml.closeModal();
                    let mensajeError = new MensajeException(e);
                    GestorPageHtml.mensajeError(mensajeError.getMensaje());
                });
		});    	
    }

    generarEventoAgregarComida() {
    	let btnAgregarComida = this._container.querySelector("#btnCrear");
    	btnAgregarComida.addEventListener("click", () => {
    		GestorPageHtml.openModal(GestorPageHtml.estructuraComida(),"Agregar","primary");
    		let btnGuardarComida = document.body.querySelector("#btnSuccessModal");
			btnGuardarComida.addEventListener("click", () => {

				let tipo = document.body.querySelector("#cboTipo").value;
				let precio = document.body.querySelector("#txtPrecio").value;
				let calorias = document.body.querySelector("#txtCalorias").value;
				let existencias = document.body.querySelector("#txtExistencias").value;
				let nombre = document.body.querySelector("#txtNombre").value;

                if(Validator.validarCamposObligatorios("formCrearComida", true) && 
                        Validator.validarLongitudCampos("formCrearComida", true)) {
                    let comida = new Comida(null, nombre, existencias, calorias, precio, tipo);

                    this._comidaApiClient.crearComida(comida)
                        .then((data) => {
                            this.listarComidas();
                            GestorPageHtml.closeModal();
                            GestorPageHtml.mensajeSuccess("Comida registrada correctamente!");

                        }).catch((e) => {
                            GestorPageHtml.closeModal();
                            let mensajeError = new MensajeException(e);
                            GestorPageHtml.mensajeError(mensajeError.getMensaje());
                        });
                }							
			});
    	});
    }
}