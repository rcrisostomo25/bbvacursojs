class Menu {
	constructor(navigation) {
		this._navigation = navigation;
		this._menuItems = [];
	}

	getMenu() {
		let cadenaMenu = "";
		this._menuItems = [];
		
		for(let indice=0; indice < this._navigation._pages.length; indice ++) {
			var page = this._navigation._pages[indice];
			if(page._isMenu != undefined && page._isMenu) {
				cadenaMenu += '<li class="link"><a id="menu'+ indice 
					+'" href="' + page._url +'"><i class="fa '+ page._icon 
					+' fa-fw"></i> '+ page._titulo + '</a></li>';

				let menuItem = new MenuItem("menu"+indice, page._url, page._titulo);
				this._menuItems.push(menuItem);
			}
		}

		return GestorPageHtml.getMenu(cadenaMenu);
	}
}

class MenuItem {
	constructor(id, url, titulo) {
		this._id = id;
		this._url = url;
		this._titulo = titulo;
	}
}