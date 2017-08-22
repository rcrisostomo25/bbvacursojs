class UserController {
	constructor(navigation) {
		this._navigation = navigation;
	}
	
	validarAutenticacion() {
		let recordar = localStorage.getItem("recordar");
		if(recordar != null) {
			this._navigation.invocarNavegacion("#principal");
		} else {
			this._navigation.invocarNavegacion("#login");
		}
	}

}