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

				let comida = new Comida(elemento._id, elemento.nombre, elemento.existencias,
					 elemento.calorias, elemento.precio, elemento.tipo);
				comidas.push(comida);
			}

			return comidas;
		});

		return anotherPromise;
	}

	crearComida(comida) {
		let completeUrl = this._baseURL;

		let objComida = {
			tipo: comida._tipo,
			precio: comida._precio,
			calorias: comida._calorias,
			existencias: comida._existencias,
			nombre: comida._nombre
		}

		let promise = this._apiClient.post(completeUrl, objComida);
		let anotherPromise = promise.then((data) => {
			return true;
		});

		return anotherPromise;
	}

	guardarComida(comida) {
		let completeUrl = this._baseURL + "/" + comida._id;

		let objComida = {
			tipo: comida._tipo,
			precio: comida._precio,
			calorias: comida._calorias,
			existencias: comida._existencias,
			nombre: comida._nombre
		}

		let promise = this._apiClient.put(completeUrl, objComida);
		let anotherPromise = promise.then((data) => {
			console.log(data);
			return true;
		});

		return anotherPromise;
	}

	eliminarComida(id) {
		let completeUrl = this._baseURL + "/" + id;

		let promise = this._apiClient.delete(completeUrl, null);
		let anotherPromise = promise.then((data) => {
			console.log(data);
			return true;
		});

		return anotherPromise;
	}

	obtenerComida(id) {
		let completeUrl = this._baseURL + "/" + id;

		let promise = this._apiClient.get(completeUrl, null);
		let anotherPromise = promise.then((data) => {
			let comida = new Comida(data._id, data.nombre, data.existencias, 
					data.calorias, data.precio, data.tipo);
			return comida;
		});

		return anotherPromise;
	}
}