class PostApiClient {
	constructor(apiClient) {
		this._baseURL = "https://jsonplaceholder.typicode.com/posts?userId=";
		this._apiClient = apiClient;
	}

	getAllPosts(userId) {
		let completeUrl = this._baseURL + userId;
		let promise = this._apiClient.get(completeUrl, null);

		let anotherPromise = promise.then((data) => {
			let posts = [];
			for(let i=0; i < data.length; i++) {
				let elemento = data[i];
				let post = new Post(elemento.userId, elemento.id, 
						elemento.title, elemento.body);
				posts.push(post);
			}

			return posts;
		});

		return anotherPromise;
	}
}