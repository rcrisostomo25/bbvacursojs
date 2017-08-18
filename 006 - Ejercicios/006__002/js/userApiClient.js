class UserApiClient {
	constructor(apiClient) {
		this._baseURL = "https://jsonplaceholder.typicode.com/users";
		this._apiClient = apiClient;
	}

	getAllUsers() {
		let completeUrl = this._baseURL;
		let promise = this._apiClient.get(completeUrl, null);

		let anotherPromise = promise.then((data) => {
			let usuarios = [];
			for(let i=0; i < data.length; i++) {
				let elemento = data[i];

				let address = new Address(elemento.address.street, 
					elemento.address.suite, elemento.address.city, null, null);

				let company = new Company(elemento.company.name, 
					elemento.company.catchPhrase, elemento.company.bs);

				let usuario = new User(elemento.id, elemento.name, 
						elemento.username, elemento.email, address, elemento.phone, elemento.website, company);

				usuarios.push(usuario);
			}

			return usuarios;
		});

		return anotherPromise;
	}
}