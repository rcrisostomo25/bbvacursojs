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

				let bebida = new Bebida(elemento._id, elemento.nombre, elemento.existencias,
					 elemento.calorias, elemento.precio, elemento.esAlcoholica, elemento.grados);
				bebidas.push(bebida);
			}

			return bebidas;
		});

		return anotherPromise;
	}

	crearBebida(bebida) {
		let completeUrl = this._baseURL;

		let objBebida = {
			grados: bebida._grados,
			esAlcoholica: bebida._esAlcoholica,
			precio: bebida._precio,
			calorias: bebida._calorias,
			existencias: bebida._existencias,
			nombre: bebida._nombre
		}

		let promise = this._apiClient.post(completeUrl, objBebida);
		let anotherPromise = promise.then((data) => {
			console.log(data);
			return true;
		});

		return anotherPromise;
	}

	obtenerBebida(id) {
		let completeUrl = this._baseURL + "/" + id;

		let promise = this._apiClient.get(completeUrl, null);
		let anotherPromise = promise.then((data) => {
			let bebida = new Bebida(data._id, data.nombre, data.existencias, 
					data.calorias, data.precio, data.esAlcoholica, data.grados);
			return bebida;
		});

		return anotherPromise;
	}

	guardarBebida(bebida) {
		let completeUrl = this._baseURL + "/" + bebida._id;

		let objBebida = {
			grados: bebida._grados,
			esAlcoholica: bebida._esAlcoholica,
			precio: bebida._precio,
			calorias: bebida._calorias,
			existencias: bebida._existencias,
			nombre: bebida._nombre
		}

		let promise = this._apiClient.put(completeUrl, objBebida);
		let anotherPromise = promise.then((data) => {
			console.log(data);
			return true;
		});

		return anotherPromise;
	}

	eliminarBebida(id) {
		let completeUrl = this._baseURL + "/" + id;

		let promise = this._apiClient.delete(completeUrl, null);
		let anotherPromise = promise.then((data) => {
			console.log(data);
			return true;
		});

		return anotherPromise;
	}
}