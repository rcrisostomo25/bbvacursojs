class Validator {
	constructor() {
		
	}

	static validarCamposObligatorios(form) {
		let mensaje = "Campos obligatorios: ";
		let inputs = document.forms[form].getElementsByTagName("input");
		for(let indice = 0; indice < inputs.length; indice++) {
			let input = inputs[indice];
			if(input.value == '' && input.getAttribute("required")) {
				mensaje += input.getAttribute("alt") + ", ";
			}
		}
		GestorPageHtml.mensajeWarning(mensaje);
	}
}