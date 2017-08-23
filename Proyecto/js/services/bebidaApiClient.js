class BebidaApiClient {
	constructor(apiClient) {
		this._baseURL = "http://formacion-indra-franlindebl.com/api/bebidas";
		this._apiClient = apiClient;
	}

	obtenerListaBebidas() {
		let completeUrl = this._baseURL;

		let promise = this._apiClient.get(completeUrl, null);
		let anotherPromise = promise.then((data) => {
			let bebidas = [];
			for(let indice = 0; indice < data.length; indice++ ){
				let elemento = data[indice];

				let bebida = new Bebida(elemento.nombre, elemento.existencias,
					 elemento.calorias, elemento.precio, elemento.esAlcoholica, elemento.grados);
				bebidas.push(bebida);
			}

			return bebidas;
		});

		return anotherPromise;
	}
}