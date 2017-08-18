class MainController {
    constructor() {
        this._container = null;
        this._divListadoUsuarios = null;
        this._apiClient = null;
        this._gestionUsuarios = null;
        this._gestionPosts = null;
        this._gestionComments = null;
    }

    postConstructor() {
        this._apiClient = new APIClient();
        this._gestionUsuarios = new GestionUsuarios(this);
        this._gestionPosts = new GestionPosts(this);
        this._gestionComments = new GestionComments(this);
        this._userApiClient = new UserApiClient(this._apiClient);
        this._postApiClient = new PostApiClient(this._apiClient);
        this._commentApiClient = new CommentApiClient(this._apiClient);
    }

    init() {
        this.postConstructor();
        this.crearEstructuraPrincipal();
        this.verUsuarios();
    }

    crearEstructuraPrincipal() {
        this._container = document.createElement("div");
        this._container.className = "container";

        this._divListadoUsuarios = document.createElement("div");
        this._divListadoUsuarios.className = "row listado-users";

        this._container.appendChild(this._divListadoUsuarios);
        document.body.appendChild(this._container);
    }

    verUsuarios() {
        this._gestionUsuarios.init(this._divListadoUsuarios);
    }

    verPosts() {
        this._gestionPosts.pintarEstructura();
        this._gestionPosts.getAllPostAndPaint(this._gestionPosts._userId);
    }
}

class GestionUsuarios {
    constructor(mainController) {
        this._contenedorHtml = null;
        this._mainController = mainController;
    }

    init(contenedorHtml) {
        this._contenedorHtml = contenedorHtml;
        this.pintarEstructura();
        this.getAllUsersAndPaint();
    }

    pintarEstructura() {
        let estructura = Utilitario.getEstructuraPanelUser(`<th>ID</th>
                                                            <th>Nombre</th>
                                                            <th>Alias</th>
                                                            <th>Email</th>
                                                            <th>Dirección</th>
                                                            <th>Teléfono</th>
                                                            <th>Web site</th>
                                                            <th>Compañia</th>`);

        this._contenedorHtml.innerHTML = estructura.replace("$", "Listado de Usuarios");
    }

    getAllUsersAndPaint() {
        this._mainController._userApiClient.getAllUsers().then((data) => {
            this.pintarUsers(data);
        });
    }

    pintarUsers(data) {
        let tbody = this._contenedorHtml.querySelector("tbody");
        tbody.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
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
        let button = document.createElement("button");
        button.className = "btn btn-success";
        button.innerHTML = "Ver detalle";

        button.addEventListener("click", (e) => {
            e.stopPropagation();
            this.mostrarDetalle(usuario._address);
        });

        td5.appendChild(button);
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

    mostrarDetalle(address) {
        let texto = "";
        texto += "<p>" + address._street + "/<p>";
        texto += "<p>" + address._suite + "/<p>";
        texto += "<p>" + address._city + "/<p>";
        texto += "<p>" + address._zipCode + "/<p>"; 
        Utilitario.openModal(texto);
    }

    getPostByUser(userId) {
        //this._mainController._gestionPosts.init(this._contenedorHtml, userId);

        Utilitario.openModal();
    }
}

class GestionPosts {
    constructor(mainController) {
        this._contenedorHtml = null;
        this._mainController = mainController;
        this._userId = null;
    }

    init(contenedorHtml, indiceUser) {
        this._contenedorHtml = contenedorHtml;
        this._userId = indiceUser;
        this.pintarEstructura();
        this.getAllPostAndPaint(this._userId);
    }

    pintarEstructura() {
        let estructura = Utilitario.getEstructuraPanel(`<th>User</th>
                                                            <th>ID</th>
                                                            <th>Título</th>
                                                            <th>Cuerpo</th>`);

        this._contenedorHtml.innerHTML = estructura.replace("$", "Listado de Posts");

        let botonRegresar = this._contenedorHtml.querySelector("#regresar");
        botonRegresar.addEventListener("click", () => this.regresarUsuarios());

    }

    regresarUsuarios() {
        this._mainController.verUsuarios();
    }

    getAllPostAndPaint(userId) {
        this._mainController._postApiClient.getAllPosts(userId).then((data) => {
            this.pintarPost(data);
        });
    }

    pintarPost(data) {
        let tbody = this._contenedorHtml.querySelector("tbody");
        tbody.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
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
        this._mainController._gestionComments.init(this._contenedorHtml, postId);
    }
}

class GestionComments {
    constructor(mainController) {
        this._contenedorHtml = null;
        this._mainController = mainController;
        this._postId = null;
    }

    init(contenedorHtml, indicePost) {
        this._contenedorHtml = contenedorHtml;
        this._postId = indicePost;
        this.pintarEstructura();
        this.getAllCommentAndPaint(this._postId);
    }

    pintarEstructura() {
        let estructura = Utilitario.getEstructuraPanel(`<th>User</th>
                                                            <th>ID</th>
                                                            <th>Título</th>
                                                            <th>Cuerpo</th>`);

        this._contenedorHtml.innerHTML = estructura.replace("$", "Listado de Comments");;

        let botonRegresar = this._contenedorHtml.querySelector("#regresar");
        botonRegresar.addEventListener("click", () => this.regresarPosts());

    }

    regresarPosts() {
        this._mainController.verPosts();
    }

    getAllCommentAndPaint(postId) {
        this._mainController._commentApiClient.getAllComments(postId).then((data) => {
            this.pintarComment(data);
        });
    }

    pintarComment(data) {
        let tbody = this._contenedorHtml.querySelector("tbody");
        tbody.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
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