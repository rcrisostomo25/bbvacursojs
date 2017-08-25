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
			input.parentElement.className = input.parentElement.className.replace("has-error","");
			if(input.getAttribute("type") == 'text') {
				if(input.getAttribute("maxlength") != null && input.getAttribute("minlength") != null) {
					if(input.value.length < input.getAttribute("minlength") || 
						input.value.length > input.getAttribute("maxlength")) {
						mensaje = "El campo " + input.getAttribute("alt") + " debe tener entre " 
							+ input.getAttribute("minlength") + " y " 
							+ input.getAttribute("maxlength") + " caracteres.";
						input.parentElement.className = input.parentElement.className + " has-error"
						break;
					}
				}
			} else if(input.getAttribute("type") == 'number') {
				if(input.getAttribute("max") != null && input.getAttribute("min") != null) {
					if(parseInt(input.value) < parseInt(input.getAttribute("min")) || 
						parseInt(input.value) > parseInt(input.getAttribute("max"))) {
						mensaje = "El campo " + input.getAttribute("alt") + " debe ser un valor numérico entre " 
							+ input.getAttribute("min") + " y " 
							+ input.getAttribute("max") + ".";
						input.parentElement.className = input.parentElement.className + " has-error"
						break;
					}
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