class SuperHeroeApiClient {
	constructor(apiClient) {
		this._baseURL = "https://ironhack-characters.herokuapp.com/characters";
		this._apiClient = apiClient;
	}

	deleteSuperheroe(superHeroe) {
		let completeUrl = this._baseURL + "/" + superHeroe._identificador;

		let promise = this._apiClient.delete(completeUrl, null);

		let anotherPromise = promise.then((data) => {
			console.log(data);
			return true;
		});

		return anotherPromise;
	}

	editSuperheroe(superHeroe) {
		let completeUrl = this._baseURL + "/" + superHeroe._identificador;

		let superHeroeObject = this.objetoSuperHeroeMapper(superHeroe);

		let promise = this._apiClient.put(completeUrl, superHeroeObject);

		let anotherPromise = promise.then((data) => {
			return true;
		});

		return anotherPromise;
	}

	createSuperheroe(superHeroe) {
		let completeUrl = this._baseURL;

		let superHeroeObject = this.objetoSuperHeroeMapper(superHeroe);

		let promise = this._apiClient.post(completeUrl, superHeroeObject);

		let anotherPromise = promise.then((data) => {
			return true;
		});

		return anotherPromise;
	}

	getAllSuperheroes() {
		let completeUrl = this._baseURL;
		let promise = this._apiClient.get(completeUrl, null);

		let anotherPromise = promise.then((data) => {
			let superHeroes = [];
			for(let i=0; i < data.length; i++) {
				let elemento = data[i];
				let superHeroe = new SuperHeroe(elemento.id, elemento.name, 
						elemento.weapon, elemento.occupation, elemento.debt);
				superHeroes.push(superHeroe);
			}

			return superHeroes;
		});

		return anotherPromise;
	}

	objetoSuperHeroeMapper(superHeroe) {
		let superHeroeObject = {
			id: superHeroe._identificador,
			name: superHeroe._alias,
			weapon: superHeroe._arma,
			occupation: superHeroe._trabajo,
			debt: superHeroe._deuda
		}

		return superHeroeObject;
	}
}