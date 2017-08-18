class PokemonApiClient {
	constructor(apiClient) {
		this._baseURL = "http://pokeapi.co/api/v2/pokemon/?offset=";
		this._apiClient = apiClient;
	}

	getPokemonAtPage(pagina) {
		let completeUrl = this._baseURL + (pagina)*20;
		let promise = this._apiClient.get(completeUrl, null);

		let anotherPromise = promise.then((data) => {
			let pokemonCollection = null;
			let pokemones = [];
			for(let i=0; i < data.results.length; i++) {
				let elemento = data.results[i];
				let pokemon = new Pokemon(elemento.name, 
					elemento.url, null, null, null);
				pokemones.push(pokemon);
			}

			pokemonCollection = new PokemonCollection(data.count, pokemones);
			return pokemonCollection;
		});

		return anotherPromise;
	}

	getPokemonByUrl(urlDetail) {
		let completeUrl = urlDetail;
		let promise = this._apiClient.get(completeUrl, null);

		let anotherPromise = promise.then((data) => {
			let pokemon = new Pokemon(null, 
					null, data.sprites.front_default, data.weight, data.height);
			return pokemon;
		});

		return anotherPromise;
	}
}