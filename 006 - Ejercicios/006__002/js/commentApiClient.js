class CommentApiClient {
	constructor(apiClient) {
		this._baseURL = "https://jsonplaceholder.typicode.com/posts/@/comments";
		this._apiClient = apiClient;
	}

	getAllComments(postId) {
		let completeUrl = this._baseURL.replace("@",postId);
		let promise = this._apiClient.get(completeUrl, null);

		let anotherPromise = promise.then((data) => {
			let comentarios = [];
			for(let i=0; i < data.length; i++) {
				let elemento = data[i];
				let comentario = new Comment(elemento.postId, elemento.id, 
						elemento.name, elemento.email, elemento.body);
				comentarios.push(comentario);
			}

			return comentarios;
		});

		return anotherPromise;
	}
}