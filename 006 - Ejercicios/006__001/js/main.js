
class MainController {
	constructor() {
		this._container = null;
		this._divAlmacenSuperheroes = null;
		this._almacenSuperheroes = new AlmacenSuperheroes();
        this._apiClient = new APIClient();
        this._superHeroApiClient = new SuperHeroeApiClient(this._apiClient);
	}

	init() {
		this.pintarEstructura();
		this._almacenSuperheroes.init(this._divAlmacenSuperheroes, this._superHeroApiClient);
	}

	pintarEstructura() {
		this._container = document.createElement("div");
		this._container.className = "container";

		this._divAlmacenSuperheroes = document.createElement("div");
		this._divAlmacenSuperheroes.className = "almacen-superheroes";

		this._container.appendChild(this._divAlmacenSuperheroes);
		document.body.appendChild(this._container);
	}
}

class SuperHeroe {
	constructor(identificador, alias, arma, trabajo, deuda) {
		this._identificador = identificador;
		this._alias = alias;
		this._arma = arma;
		this._trabajo = trabajo;
		this._deuda = deuda; 
	}
}

class AlmacenSuperheroes {
	constructor() {
		this._superheroes = [];
		this._contenedorHtml = null;
        this._superHeroApiClient = null;
	}

	init(contenedorHtml, superHeroApiClient) {
		this._contenedorHtml = contenedorHtml;
        this._superHeroApiClient = superHeroApiClient;
		this.pintarEstructura();
        this.getAllSuperherosAndPaint();
	}

	pintarEstructura() {
		let estructura =  `<h1 class="main-title">CRUD de Superheroes</h1>
            <div class="well">
                <h2 class="form-title">Formulario</h2>
                <form class="form-inline">
                    <div class="form-group">
                        <label for="nombre">Nombre:</label>
                        <input type="text" class="form-control" id="nombre" placeholder="Han Solo">
                    </div>
                    <div class="form-group">
                        <label for="arma">Arma:</label>
                        <input type="text" class="form-control" id="arma" placeholder="Pistola">
                    </div>
                    <div class="form-group">
                        <label for="profesion">Profesión:</label>
                        <input type="text" class="form-control" id="profesion" placeholder="Asesino">
                    </div>
                    <div class="form-group">
                        <label class="checkbox-inline">
                            <input type="checkbox" id="deuda" value=""> Deuda
                        </label>
                    </div>
                    <button type="button" id="guardar" class="btn btn-success hidden">Guardar</button>
                    <button type="button" id="crear" class="btn btn-success">Crear</button>
                    <button type="button" id="reset" class="btn btn-default">Reset</button>
                </form>
            </div>

            <div id="mensaje" class="alert alert-success hidden" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            </div>

            <div>
                <button type="button" id="refrescar" class="btn btn-primary">Refrescar</button>
            </div>

            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Arma</th>
                        <th>Profesión</th>
                        <th>Deuda</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                   
                </tbody>
            </table>

            <nav aria-label="...">
              <ul class="pager">
                <li><a href="#">Atrás</a></li>
                <li><a href="#">Siguiente</a></li>
              </ul>
            </nav>`;

        this._contenedorHtml.innerHTML = estructura;

        let botonResfrescar = this._contenedorHtml.querySelector("#refrescar");
        botonResfrescar.addEventListener("click", () => this.getAllSuperherosAndPaint());

        let botonCrear = this._contenedorHtml.querySelector("#crear");
        botonCrear.addEventListener("click", () => this.crearSuperHeroe(this._contenedorHtml));

        let botonReset = this._contenedorHtml.querySelector("#reset");
        botonReset.addEventListener("click", () => this.limpiarCamposDeTexto(this._contenedorHtml));
	}

	getAllSuperherosAndPaint() {
        this._superHeroApiClient.getAllSuperheroes().then((data) => {
            this.pintarSuperheroes(data);
        });
	}

	pintarSuperheroes(data) {
        let tbody = this._contenedorHtml.querySelector("tbody");
        tbody.innerHTML = "";

        for(let i=0; i<data.length; i++) {
            let superHeroe = data[i];
            let row = this.getRowForSuperHeroe(superHeroe);
            tbody.appendChild(row); 
        }
	}

    getRowForSuperHeroe(superHeroe) {
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerHTML = superHeroe._identificador;
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.innerHTML = superHeroe._alias;
        tr.appendChild(td2);

        let td3 = document.createElement("td");
        td3.innerHTML = superHeroe._arma;
        tr.appendChild(td3);

        let td4 = document.createElement("td");
        td4.innerHTML = superHeroe._trabajo;
        tr.appendChild(td4);

        let td5 = document.createElement("td");
        td5.innerHTML = superHeroe._deuda;
        tr.appendChild(td5);

        let td6 = document.createElement("td");
        //Boton
        let button1 = document.createElement("button");
        button1.innerHTML = "Editar"
        button1.className = "btn btn-warning"
        button1.addEventListener("click",() => this.editarSuperHeroe(superHeroe));
        td6.appendChild(button1);

        let button2 = document.createElement("button");
        button2.innerHTML = "Eliminar"
        button2.className = "btn btn-danger"
        button2.addEventListener("click",() => this.confirmacionBorrarSuperHeroe(superHeroe));
        td6.appendChild(button2);
        tr.appendChild(td6);

        return tr;
    }

    crearSuperHeroe(contenedorHtml) {
        var txtNombre = contenedorHtml.querySelector("#nombre").value;
        var txtArma = contenedorHtml.querySelector("#arma").value;
        var txtProfesion = contenedorHtml.querySelector("#profesion").value;
        var chkDeuda = contenedorHtml.querySelector("#deuda").checked;

        var superHeroeNuevo = new SuperHeroe(null, txtNombre, txtArma, txtProfesion, chkDeuda);

        this._superHeroApiClient.createSuperheroe(superHeroeNuevo).then((data) => {
            this.mostrarMensaje(contenedorHtml, "SuperHeroe creado correctamente!");
            this.getAllSuperherosAndPaint();
        });
    }

    editarSuperHeroe(superHeroe) {
        var txtNombre = document.querySelector("#nombre");
        txtNombre.value = superHeroe._alias;

        var txtArma = document.querySelector("#arma");
        txtArma.value = superHeroe._arma;

        var txtProfesion = document.querySelector("#profesion");
        txtProfesion.value = superHeroe._trabajo;

        var btnCrear = document.querySelector("#crear");
        btnCrear.className = btnCrear.className + " hidden";

        var old_btn = document.querySelector("#guardar");
        var new_btn = old_btn.cloneNode(true);
        new_btn.className = new_btn.className.replace("hidden","");
        new_btn.addEventListener("click",() => this.guardarHeroe(superHeroe));
        old_btn.parentNode.replaceChild(new_btn, old_btn);
    }

    guardarHeroe(superHeroe) {
        var txtNombre = document.querySelector("#nombre").value;
        var txtArma = document.querySelector("#arma").value;
        var txtProfesion = document.querySelector("#profesion").value;
        var chkDeuda = document.querySelector("#deuda").checked;

        superHeroe._alias = txtNombre;
        superHeroe._arma = txtArma;
        superHeroe._trabajo = txtProfesion;
        superHeroe._deuda = chkDeuda;

        this._superHeroApiClient.editSuperheroe(superHeroe).then((data) => {
            this.mostrarMensaje("SuperHeroe actualizado correctamente!");
            this.getAllSuperherosAndPaint();
        });
    }

    confirmacionBorrarSuperHeroe(superHeroe) {
        this.agregarBotonesPopup(superHeroe);
        this.mostrarPopup(true);
    }

    borrarSuperHeroe(superHeroe) {
        this._superHeroApiClient.deleteSuperheroe(superHeroe).then((data) => {
            this.getAllSuperherosAndPaint();
            this.mostrarPopup(false);
        });
    }

    limpiarCamposDeTexto(contenedorHtml) {
        var txtNombre = contenedorHtml.querySelector("#nombre");
        txtNombre.value = "";

        var txtArma = contenedorHtml.querySelector("#arma");
        txtArma.value = "";

        var txtProfesion = contenedorHtml.querySelector("#profesion");
        txtProfesion.value = "";

        var btnCrear = contenedorHtml.querySelector("#crear");
        btnCrear.className = btnCrear.className.replace("hidden","");

        var btnGuardar = document.querySelector("#guardar");
        btnGuardar.className = btnGuardar.className + " hidden";
    }

    mostrarMensaje(mensajeAMostrar) {
        var mensaje = document.querySelector("#mensaje");
        mensaje.className = mensaje.className.replace("hidden","");
        mensaje.innerHTML = mensaje.innerHTML + mensajeAMostrar;
        this.ocultarMensaje();
    }

    ocultarMensaje() {
        setTimeout(() => {
            var mensaje = document.querySelector("#mensaje");
            mensaje.className = mensaje.className + " hidden";
            mensaje.innerHTML = "";
        }, 2000);
    }

    mostrarPopup(mostrar) {
        var modal = document.getElementById("myModal");
        if(mostrar) {
            modal.style.display = "block";
        } else {
            modal.style.display = "none";
        }
    }

    agregarBotonesPopup(superHeroe) {
        var btnEliminar = document.createElement("button");
        btnEliminar.className = "btn btn-danger";
        btnEliminar.innerHTML = "Eliminar";
        btnEliminar.setAttribute("style","margin-right: 15px;")
        btnEliminar.addEventListener("click",() => this.borrarSuperHeroe(superHeroe));

        var btnCancelar = document.createElement("button");
        btnCancelar.className = "btn btn-default";
        btnCancelar.innerHTML = "Cancelar";
        btnCancelar.addEventListener("click",() => this.mostrarPopup(false));

        var p = document.createElement("p");
        p.innerHTML = "¿Estás seguro que deseas eliminar el superHeroe?"

        var modalContent = document.getElementById("myModalContent");
        modalContent.innerHTML = "";
        modalContent.appendChild(p);
        modalContent.appendChild(btnEliminar);
        modalContent.appendChild(btnCancelar);
    }
}

window.onload = function() {
	let mc = new MainController();
	mc.init();
} 