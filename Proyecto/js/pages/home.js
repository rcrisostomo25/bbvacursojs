class Home extends InnerPage {
	constructor(container, apiClient) {
		super("Home","#home",container);
		this._apiClient = apiClient;
		this._comidaApiClient = new ComidaApiClient(this._apiClient);
		this._bebidaApiClient = new BebidaApiClient(this._apiClient);
        this._isMenu = true;	
        this._icon = "fa-home"; 
	}

	pintarContenido() {
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

            GestorGrafico.pintarGraficoPie(arrayGraficoExistencias, "existencias");
            GestorGrafico.pintarGraficoBarras(arrayGraficoCalorias, "calorias");

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
        		label: "Alcoholicas",
        		value: parseInt(totalAlcoholicas *100 / (totalAlcoholicas + totalNoAlcoholicas))
        	}
        	arrayGraficoBebidasAlcoholicas.push(objAlco);

        	let objNoAlco = {
        		label: "No Alcoholicas",
        		value: parseInt(totalNoAlcoholicas *100 / (totalAlcoholicas + totalNoAlcoholicas))
        	}
        	arrayGraficoBebidasAlcoholicas.push(objNoAlco);
        	GestorGrafico.pintarGraficoPie(arrayGraficoBebidasAlcoholicas, "alcoholicas");        	
        });
	}
}