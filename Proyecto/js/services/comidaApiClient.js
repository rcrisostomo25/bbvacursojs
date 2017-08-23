class ComidaApiClient {
	constructor(apiClient) {
		this._baseURL = "http://formacion-indra-franlindebl.com/api/comidas";
		this._apiClient = apiClient;
	}

	obtenerListaComidas() {
		let completeUrl = this._baseURL;

		let promise = this._apiClient.get(completeUrl, null);
		let anotherPromise = promise.then((data) => {
			let comidas = [];
			for(let indice = 0; indice < data.length; indice++ ){
				let elemento = data[indice];

				let comida = new Comida(elemento.nombre, elemento.existencias,
					 elemento.calorias, elemento.precio, elemento.tipo);
				comidas.push(comida);
			}

			return comidas;
		});

		return anotherPromise;
	}

	crearComida() {
		let completeUrl = this._baseURL;

		let promise = this._apiClient.post(completeUrl, null);
		let anotherPromise = promise.then((data) => {
			console.log(data);
		});

		return anotherPromise;
	}

	editarComida() {
		let completeUrl = this._baseURL;

		let promise = this._apiClient.post(completeUrl, null);
		let anotherPromise = promise.then((data) => {
			console.log(data);
		});

		return anotherPromise;
	}

	eliminarComida() {
		let completeUrl = this._baseURL;

		let promise = this._apiClient.post(completeUrl, null);
		let anotherPromise = promise.then((data) => {
			console.log(data);
		});

		return anotherPromise;
	}
}