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