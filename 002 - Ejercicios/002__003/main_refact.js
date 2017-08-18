/*

Ejercicio 002__003

Xanxo Whatsapp

Partiendo de los ficheros entregados...

Orquesta la comunicación entre los dos iPhones

Los mensajes que envíe el iphone1 llegarán al iphone2 y viceversa.

No olvides pintar también los mensajes enviados por el propio usuario.

Para pintar dispones de la función pintarMensaje(idIphone, mensaje, esPropio) 

Para obtener el mensaje que ha escrito un usuario dispones de la función getMensaje(idIphone) 

*/
class PubSub {
    constructor() {
        this._suscriptores = { };
    }

    sub(nombreEvento, funcionCallbackSuscriptor) {
        //Si no existe el canal, seteo un array vacio
        if (!this._suscriptores[nombreEvento]) {
            this._suscriptores[nombreEvento] = [];
        }
        
        // añado el suscriptor al canal
        this._suscriptores[nombreEvento].push(funcionCallbackSuscriptor);
    }

    pub(nombreEvento, data) {
        // Si el evento existe, recorremos el array con los callbacks
        // De los suscriptores, y lo ejecutamos pasándole el data
        if (this._suscriptores[nombreEvento]) {
            this._suscriptores[nombreEvento].forEach(function(funcionCallbackSuscriptor) {
                funcionCallbackSuscriptor(data);
            });
        }
    }
}

class GestionMensaje {
	constructor() {

	}

	static pintarMensaje(idIphone, mensaje, esPropio, nombreUsuario) {
	    var selector = "#" + idIphone + " " + ".messages";
	    var misMensajes = document.querySelector(selector);

	    var elementMessage = document.createElement("div");

	    if (esPropio) {
	        elementMessage.className = "message messageOwn";
	    } else {
	        elementMessage.className = "message";

	        // Como no es propio, ponemos nombre de usuario
	        var elementUserName = document.createElement("div");
	        elementUserName.className = "message__username";
	        elementUserName.innerHTML = nombreUsuario;

	        // Coloco el nombre de usuario dentro del mensaje
	        elementMessage.insertBefore(elementUserName, null);
	    }

	    // Como no es propio, ponemos nombre de usuario
	    var elementText = document.createElement("div");
	    elementText.className = "message__text";
	    elementText.innerHTML = mensaje;

	    // Coloco el nombre de usuario dentro del mensaje
	    elementMessage.insertBefore(elementText, null);

	    // Inserto el mensaje
	    misMensajes.insertBefore(elementMessage, null);
	}

	static getMensaje(idIphone) {
	    // COJO EL TEXTO Y LO LIMPIO
	    var selector = "#" + idIphone + " " + "textarea";
	    var miTextarea = document.querySelector(selector);
	    var mensaje = miTextarea.value;
	    miTextarea.value = "";

	    // COJO EL DESTINATARIO
	    var selector2 = "#" + idIphone + " " + "select";
	    var miSelect = document.querySelector(selector2);
	    var destinatario = miSelect.options[miSelect.selectedIndex].value;
	    
	    // DEVUELVO UN OBJETO CON LA INFO
	    var objeto = {
	        mensaje: mensaje,
	        destinatario: destinatario,
	        origen: idIphone
	    };

	    return objeto;
	}
}

class MainController {
	constructor() {
		this._pubSub = new PubSub();
		this._mensajes = {};
		this.cargarMensajes();
	}

	iniciarTelefonos() {
		for(let indice=1; indice < 5; indice++) {
			let telefono = new Telefono(indice, this._pubSub, this, this._mensajes);
		}
	}

	cargarMensajes() {
		let objetoMensaje = localStorage.getItem("mensajes");
		if(objetoMensaje != null) {
			let arrayObjetoMensaje = JSON.parse(objetoMensaje);
			this._mensajes = arrayObjetoMensaje;
		}
	}

	guardarMensajes(iphone, mensaje) {
		if (!this._mensajes[iphone]) {
            this._mensajes[iphone] = [];
        }
        this._mensajes[iphone].push(mensaje);

        let objetoMensaje = JSON.stringify(this._mensajes);
        localStorage.setItem("mensajes", objetoMensaje);
	}
}

class Telefono {
	constructor(id, pubSub, mainController, mensajes) {
		this._id = id;
		this._pubSub = pubSub;
		this._mainController = mainController;
		this._mensajes = mensajes;

		this.cargarMensajeIphone();
		this.suscribirse();
		this.eventoPublicar();
	}

	cargarMensajeIphone() {
		for(let indice in this._mensajes) {
			if(indice == ('iphone' + this._id)) {
				let arrayMensajes = this._mensajes[indice];
				arrayMensajes.forEach(function(elemento) {
					let espropio = indice == elemento.origen ? true : false; 
					GestionMensaje.pintarMensaje(indice, elemento.mensaje, espropio, elemento.origen);
				});
			} 
		}
	}

	eventoPublicar() {
		let button = document.querySelector("#i"+ this._id);
		button.addEventListener("click",() => this.enviarMensajeIphone("iphone" + this._id));
	}

	enviarMensajeIphone(iphone) {
		var mensaje = GestionMensaje.getMensaje(iphone);
		this._pubSub.pub(mensaje.destinatario, mensaje);
		if(mensaje.destinatario != 'TODOS') {
			GestionMensaje.pintarMensaje(mensaje.origen, mensaje.mensaje, true, mensaje.destinatario);
			this._mainController.guardarMensajes(mensaje.origen, mensaje);
		}
	}

	suscribirse() {
		this._pubSub.sub("iphone" + this._id, (data) => this.enviarMensaje(data));
		this._pubSub.sub("TODOS", (data) => this.enviarMensajeTodos(data));
	}

	enviarMensaje(data) {
		GestionMensaje.pintarMensaje(data.destinatario, data.mensaje, false, data.origen);
		this._mainController.guardarMensajes(data.destinatario, data);
	}

	enviarMensajeTodos(data) {
		let espropio = data.origen == ("iphone" + this._id) ? true : false;
		GestionMensaje.pintarMensaje("iphone" + this._id, data.mensaje, espropio, data.origen);
	}
}

window.onload = function() {
	var mc = new MainController();
	mc.iniciarTelefonos();
}
