class Navigation {
	constructor() {
		this._pages = [];
	}

	invocarNavegacion(url) {
		for(let indice=0; indice < this._pages.length; indice++ ) {
			var page = this._pages[indice];
			if(page._url == url) {
				window.history.pushState(null,page._titulo,page._url);
				page.pintarContenido();
			}
		}
	}

	agregarPaginaNavegacion(page) {
		this._pages.push(page);
		page._navigation = this;
	}
}