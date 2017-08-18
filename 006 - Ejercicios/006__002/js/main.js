class MainController {
	constructor() {
		this._container = null;
		this._divListadoUsuarios = null;
        this._apiClient = new APIClient();
		this._gestionUsuarios = new GestionUsuarios(this._apiClient);
    }

	init() {
		this.pintarEstructura();
		this._gestionUsuarios.init(this._divListadoUsuarios);
	}

	pintarEstructura() {
		this._container = document.createElement("div");
		this._container.className = "container";

		this._divListadoUsuarios = document.createElement("div");
		this._divListadoUsuarios.className = "listado-users";

		this._container.appendChild(this._divListadoUsuarios);
		document.body.appendChild(this._container);
	}
}

class GestionUsuarios {
	constructor(apiClient) {
		this._contenedorHtml = null;
        this._apiClient = apiClient;
        this._userApiClient = new UserApiClient(this._apiClient);
        this._gestionPosts = new GestionPosts(this._apiClient);
        this._divListadoPosts = null;
	}

	init(contenedorHtml) {
		this._contenedorHtml = contenedorHtml;
		this.pintarEstructura();
        this.getAllUsersAndPaint();
	}

	pintarEstructura() {
		let estructura =  `<h1 class="main-title">Lista de Usuarios </h1>
                        <table class="table-users table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Alias</th>
                        <th>Email</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Web site</th>
                        <th>Compañia</th>
                    </tr>
                </thead>
                <tbody>
                   
                </tbody>
            </table>

            <nav aria-label="...">
              <ul class="pager">
                <li><a href="#">Atrás</a></li>
                <li><a href="#">Siguiente</a></li>
              </ul>
            </nav>`;

        this._contenedorHtml.innerHTML = estructura;
	}

	getAllUsersAndPaint() {
        this._userApiClient.getAllUsers().then((data) => {
            this.pintarUsers(data);
        });
	}

	pintarUsers(data) {
        let tbody = this._contenedorHtml.querySelector("tbody");
        tbody.innerHTML = "";

        for(let i=0; i<data.length; i++) {
            let usuario = data[i];
            let row = this.getRowForUser(usuario);
            tbody.appendChild(row); 
        }
	}

    getRowForUser(usuario) {
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerHTML = usuario._id;
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.innerHTML = usuario._name;
        tr.appendChild(td2);

        let td3 = document.createElement("td");
        td3.innerHTML = usuario._username;
        tr.appendChild(td3);

        let td4 = document.createElement("td");
        td4.innerHTML = usuario._email;
        tr.appendChild(td4);

        let td5 = document.createElement("td");
        td5.innerHTML = usuario._address._street;
        tr.appendChild(td5);

        let td6 = document.createElement("td");
        td6.innerHTML = usuario._phone;
        tr.appendChild(td6);

        let td7 = document.createElement("td");
        td7.innerHTML = usuario._website;
        tr.appendChild(td7);

        let td8 = document.createElement("td");
        td8.innerHTML = usuario._company._name;
        tr.appendChild(td8); 

        tr.addEventListener("click", () => this.getPostByUser(usuario._id));      

        return tr;
    }

    getPostByUser(userId) {
        var container = document.querySelector(".container");
        container.innerHTML = "";

        this._divListadoPosts  = document.createElement("div");
        this._divListadoPosts.className = "listado-posts";

        this._gestionPosts.init(this ,this._divListadoPosts, userId);

        container.appendChild(this._divListadoPosts);
    }
}

class GestionPosts {
    constructor(apiClient) {
        this._contenedorHtml = null;
        this._apiClient = apiClient;
        this._postApiClient = new PostApiClient(this._apiClient);
        this._gestionComments = new GestionComments(this._apiClient);
        this._divListadoComments = null;
        this._gestionUsuarios = null;
        this._userId = null;
    }

    init(gestionUsuarios, contenedorHtml, indiceUser) {
        this._gestionUsuarios = gestionUsuarios;
        this._contenedorHtml = contenedorHtml;
        this._userId = indiceUser;
        this.pintarEstructura();
        this.getAllPostAndPaint(this._userId);
    }

    regresarUsuarios() {
        this._gestionUsuarios.init(this._contenedorHtml);
    }

    pintarEstructura() {
        let estructura =  `<h1 class="main-title">Lista de Posts </h1>
                        <button type="button" id="regresar" class="btn btn-default">Regresar</button> 
                        <table class="table-users table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Cuerpo</th>
                    </tr>
                </thead>
                <tbody>
                   
                </tbody>
            </table>

            <nav aria-label="...">
              <ul class="pager">
                <li><a href="#">Atrás</a></li>
                <li><a href="#">Siguiente</a></li>
              </ul>
            </nav>`;

        this._contenedorHtml.innerHTML = estructura;

        let botonRegresar = this._contenedorHtml.querySelector("#regresar");
        botonRegresar.addEventListener("click", () => this.regresarUsuarios());

    }

    getAllPostAndPaint(userId) {
        this._postApiClient.getAllPosts(userId).then((data) => {
            this.pintarPost(data);
        });
    }

    pintarPost(data) {
        let tbody = this._contenedorHtml.querySelector("tbody");
        tbody.innerHTML = "";

        for(let i=0; i<data.length; i++) {
            let post = data[i];
            let row = this.getRowForPost(post);
            tbody.appendChild(row); 
        }
    }

    getRowForPost(post) {
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerHTML = post._userId;
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.innerHTML = post._id;
        tr.appendChild(td2);

        let td3 = document.createElement("td");
        td3.innerHTML = post._title;
        tr.appendChild(td3);

        let td4 = document.createElement("td");
        td4.innerHTML = post._body;
        tr.appendChild(td4);

        tr.addEventListener("click", () => this.getCommentByPost(post._id));      

        return tr;
    }

    getCommentByPost(postId) {
        var container = document.querySelector(".container");
        container.innerHTML = "";

        this._divListadoComments  = document.createElement("div");
        this._divListadoComments.className = "listado-comments";

        this._gestionComments.init(this, this._divListadoComments, postId);

        container.appendChild(this._divListadoComments);
    }
}

class GestionComments {
    constructor(apiClient) {
        this._contenedorHtml = null;
        this._apiClient = apiClient;
        this._commentApiClient = new CommentApiClient(this._apiClient);
        this._gestionPosts = null;
    }

    init(gestionPosts, contenedorHtml, indicePost) {
        this._gestionPosts = gestionPosts;
        this._contenedorHtml = contenedorHtml;
        this.pintarEstructura();
        this.getAllCommentAndPaint(indicePost);
    }

    regresarPosts() {
        console.log(this._gestionPosts._userId);
        this._gestionPosts.pintarEstructura();
        this._gestionPosts.getAllPostAndPaint(this._gestionPosts._userId);
    }

    pintarEstructura() {
        let estructura =  `<h1 class="main-title">Lista de Comments </h1>
                        <button type="button" id="regresar" class="btn btn-default">Regresar</button> 
                        <table class="table-users table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Cuerpo</th>
                    </tr>
                </thead>
                <tbody>
                   
                </tbody>
            </table>

            <nav aria-label="...">
              <ul class="pager">
                <li><a href="#">Atrás</a></li>
                <li><a href="#">Siguiente</a></li>
              </ul>
            </nav>`;

        this._contenedorHtml.innerHTML = estructura;

        let botonRegresar = this._contenedorHtml.querySelector("#regresar");
        botonRegresar.addEventListener("click", () => this.regresarPosts());

    }

    getAllCommentAndPaint(postId) {
        this._commentApiClient.getAllComments(postId).then((data) => {
            this.pintarComment(data);
        });
    }

    pintarComment(data) {
        let tbody = this._contenedorHtml.querySelector("tbody");
        tbody.innerHTML = "";

        for(let i=0; i<data.length; i++) {
            let comment = data[i];
            let row = this.getRowForComment(comment);
            tbody.appendChild(row); 
        }
    }

    getRowForComment(post) {
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerHTML = post._postId;
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.innerHTML = post._id;
        tr.appendChild(td2);

        let td3 = document.createElement("td");
        td3.innerHTML = post._title;
        tr.appendChild(td3);

        let td4 = document.createElement("td");
        td4.innerHTML = post._body;
        tr.appendChild(td4);   

        return tr;
    }
}

window.onload = function() {
	let mc = new MainController();
	mc.init();
} 