class Validator {
	constructor() {
		
	}

	static validarCamposObligatorios(form, esPopup) {
		let mensaje = "";
		let inputs = document.forms[form].getElementsByTagName("input");
		for(let indice = 0; indice < inputs.length; indice++) {
			let input = inputs[indice];
			if(input.value == '' && input.getAttribute("required")) {
				mensaje += input.getAttribute("alt") + ", ";
			}
		}

		if(mensaje != "") {
			mensaje = "Campos obligatorios: " + mensaje;
			if(esPopup) {
				GestorPageHtml.mensajeErrorPopup(mensaje);
			} else {
				GestorPageHtml.mensajeError(mensaje);
			}			
			return false;
		}
		return true;
	}

	static validarLongitudCampos(form, esPopup) {
		let mensaje = "";
		let inputs = document.forms[form].getElementsByTagName("input");
		for(let indice = 0; indice < inputs.length; indice++) {
			let input = inputs[indice];
			if(input.getAttribute("maxlength") != null || input.getAttribute("maxlength") != undefined) {
				if(input.value.length < input.getAttribute("minlength") || 
					input.value.length > input.getAttribute("maxlength")) {
					mensaje = "El campo " + input.getAttribute("alt") + " debe tener entre " 
						+ input.getAttribute("minlength") + " y " 
						+ input.getAttribute("maxlength") + " caracteres.";
					break;
				}
			}			
		}

		if(mensaje != "") {
			if(esPopup) {
				GestorPageHtml.mensajeErrorPopup(mensaje);
			} else {
				GestorPageHtml.mensajeError(mensaje);
			}
			return false;
		}
		return true;
	}
}