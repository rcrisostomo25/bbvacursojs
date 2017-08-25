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
		divMenu.innerHTML = this._menu.getMenu();
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
		for(let indiceMenu=0; indiceMenu < this._menu._menuItems.length; indiceMenu++ ) {
			let menuItem = this._container.querySelector("#" + this._menu._menuItems[indiceMenu]._id);
       		menuItem.addEventListener("click", () => 
       			this._navigation.invocarNavegacion(this._menu._menuItems[indiceMenu]._url));	
		}
		
        let logout = this._container.querySelector("#logout");
        logout.addEventListener("click", () => {
        	GestorPageHtml.openModal(GestorPageHtml.estructuraLogOut(), "Cerrar Sesión", "danger");

        	let btnSalir = document.body.querySelector("#btnSuccessModal");
			btnSalir.addEventListener("click", () => {
				localStorage.removeItem("userSession");
        		this._navigation.invocarNavegacion("#login");
        		GestorPageHtml.closeModal();	
			});

        });
	}

	generarEventoBuscarTexto() {
        let btnBuscarTexto = this._container.querySelector("#btnBuscar");
        btnBuscarTexto.addEventListener("click", () => {

            let texto = this._container.querySelector("#txtBuscar").value;
            let table = new Table("#tableResultados");
            table.buscarTexto(texto);
            
        });
    }
}