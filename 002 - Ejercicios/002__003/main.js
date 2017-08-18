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
		this.pubSubButtons();
	}

	init() {
		for(let indice=0; indice < 4; indice++) {
			let button1 = document.querySelector("#i"+(indice+1));
			button1.addEventListener("click",() => this.enviarMensajeIphone("iphone"+(indice+1)));	
		}
	}

	enviarMensajeIphone(iphone) {
		var mensaje = GestionMensaje.getMensaje(iphone);
		this._pubSub.pub(mensaje.destinatario, mensaje);
	}

	recibirMensaje(data) {
		GestionMensaje.pintarMensaje(data.destinatario, data.mensaje, false, data.origen);
		GestionMensaje.pintarMensaje(data.origen, data.mensaje, true, data.destinatario);
	}

	recibirMensajeTodos(data) {
		let iphonePropio = data.origen;	
		for(let indice=0; indice < 4; indice++) {
			var iph = 'iphone' + (indice+1);
			if(iphonePropio != iph) {
				GestionMensaje.pintarMensaje(iph, data.mensaje, false, iphonePropio);	
			} else {
				GestionMensaje.pintarMensaje(iphonePropio, data.mensaje, true, iph);
			}
		}
	}

	pubSubButtons() {
		this._pubSub.sub('iphone1', (data) => this.recibirMensaje(data));
		this._pubSub.sub('iphone2', (data) => this.recibirMensaje(data));
		this._pubSub.sub('iphone3', (data) => this.recibirMensaje(data));
		this._pubSub.sub('iphone4', (data) => this.recibirMensaje(data));
		this._pubSub.sub('TODOS', (data) => this.recibirMensajeTodos(data));
	}
}

window.onload = function() {
	var mc = new MainController();
	mc.init();
}
