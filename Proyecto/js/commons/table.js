class Table {
	constructor(id) {
		this._id = id;
		this._rows = [];
		this._trs = null;
		this.init();
	}

	init() {
		let table = document.body.querySelector(this._id);
        this._trs = table.getElementsByTagName("tr");

        if(this._trs.length > 1) {
            for(let indice=1; indice < this._trs.length; indice++) {
                this._rows.push(this._trs[indice]);       
            }
        }
	}

	buscarTexto(texto) {
        if(this._rows.length > 1) {
            for(let indice=1; indice < this._trs.length; indice++) {
                let tds = this._trs[indice].getElementsByTagName("td");
                let nombre = tds[0].innerHTML;
                if(nombre.toUpperCase().indexOf(texto.trim().toUpperCase()) == -1) {
                    this._trs[indice].className = "hidden";
                } else {
                	this._trs[indice].className = "";
                }        
            } 
        }
	}
}