class MainController {
	constructor() {
        this._navigation = new Navigation();
		this._login = null;
        this._crearCuenta = null;
        this._home = null;
        this._page1 = null;
        this._page2 = null;
        this._page3 = null;
        this._userController = null;
        this._container = null;
        this.crearEstructuraPrincipal();
    }

	init() {
       this._login = new Login(this._container);
       this._navigation.agregarPaginaNavegacion(this._login);
       this._crearCuenta = new CrearCuenta(this._container);
       this._navigation.agregarPaginaNavegacion(this._crearCuenta);
       this._home = new Home(this._container);
       this._navigation.agregarPaginaNavegacion(this._home);
       this._page1 = new Page1(this._container);
       this._navigation.agregarPaginaNavegacion(this._page1);
       this._page2 = new Page2(this._container);
       this._navigation.agregarPaginaNavegacion(this._page2);
       this._page3 = new Page3(this._container);
       this._navigation.agregarPaginaNavegacion(this._page3);
       this._userController = new UserController(this._navigation);
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