class MainController {
	constructor() {
        this._navigation = new Navigation();
		this._login = null;
        this._crearCuenta = null;
        this._home = null;
        this._comidaPage = null;
        this._bebidaPage = null;
        this._usuarioPage = null;
        this._userController = null;
        this._apiClient = new ApiClient();
        this._container = null;
        this.crearEstructuraPrincipal();
    }

	init() {
       this._userController = new UserController(this._navigation, this._apiClient);
       this._login = new Login(this._container, this._userController);
       this._navigation.agregarPaginaNavegacion(this._login);
       this._crearCuenta = new CrearCuenta(this._container, this._userController);
       this._navigation.agregarPaginaNavegacion(this._crearCuenta);

       this._home = new Home(this._container, this._apiClient);
       this._navigation.agregarPaginaNavegacion(this._home);

       this._comidaPage = new ComidaPage(this._container, this._apiClient);
       this._navigation.agregarPaginaNavegacion(this._comidaPage);

       this._bebidaPage = new BebidaPage(this._container, this._apiClient);
       this._navigation.agregarPaginaNavegacion(this._bebidaPage);

       this._usuarioPage = new UsuarioPage(this._container, this._userController);
       this._navigation.agregarPaginaNavegacion(this._usuarioPage);
	}

    irLogin() {
        this._userController.validarAutenticacion();
    }

    crearEstructuraPrincipal() {
        this._container = document.createElement("div");
        this._container.className = "container";
        
        document.body.appendChild(this._container);
    }
}

window.onload = function() {
	let mainController = new MainController();
	mainController.init();
    mainController.irLogin();
}