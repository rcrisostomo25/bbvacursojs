window.onload = function() {

	//****************************************************
	// ********* CREACION DE CUERPO HEADER ***************
	//****************************************************
	var siteHeader = document.createElement("header");
	document.body.appendChild(siteHeader);

	var imgHeader = document.createElement("img");
	imgHeader.src = "https://img.elcomercio.pe/bundles/appcms/images/elcomercio/logo_ec.png?1501791807";

	var hiperLinkHeader = document.createElement("a");
	hiperLinkHeader.href = "#";

	hiperLinkHeader.appendChild(imgHeader);

	var divHeader = document.createElement("div");
	divHeader.setAttribute("class","site-logo clearfix");
	divHeader.appendChild(hiperLinkHeader);

	siteHeader.setAttribute("class","site-header");
	siteHeader.appendChild(divHeader);

	//****************************************************
	// ********* CREACION DEL NAV ************************
	//****************************************************
	var siteMenu = document.createElement("nav");
	siteMenu.setAttribute("class","site-menu");

	var divMenu = document.createElement("div");
	divMenu.setAttribute("class","box-content clearfix");

	var ulMenu = document.createElement("ul");
	ulMenu.setAttribute("class","home-menu");

	var liMenu = null;
	for(var indice = 0; indice < 11; indice ++) {
		liMenu = document.createElement("li");
		liMenu.setAttribute("class","link");

		var hiperLinkMenu = document.createElement("a");
		hiperLinkMenu.href = "#";
		hiperLinkMenu.innerHTML = "menu " + (indice+1);
		liMenu.appendChild(hiperLinkMenu); 

		ulMenu.appendChild(liMenu);
	}

	divMenu.appendChild(ulMenu);
	siteMenu.appendChild(divMenu);
	document.body.appendChild(siteMenu);

	//****************************************************
	// ********* CREACION DEL DIV BODY********************
	//****************************************************
	var siteBody = document.createElement("div");
	siteBody.setAttribute("class","row site-body");

	//PRIMERO COLUMNA DE ANCHO 9i
	var colMd9 = document.createElement("div");
	colMd9.setAttribute("class","flow-2x1 flow-bottom-left col-sm-9");

		var divDetalle = document.createElement("div");
		divDetalle.setAttribute("class","flow-detail");

			var h2Detalle = document.createElement("h2");
			h2Detalle.setAttribute("class","flow-title");
			var hiperLinkH2 = document.createElement("a");
			hiperLinkH2.setAttribute("class","page-link");
			hiperLinkH2.setAttribute("href","#");
			hiperLinkH2.innerHTML = "PPK les pide a maestros renunciar a actos de violencia para dialogar";
			h2Detalle.appendChild(hiperLinkH2);

			var spanDetalle = document.createElement("span");
			spanDetalle.setAttribute("class","flow-author");
			var hiperLinkSpan = document.createElement("a");
			hiperLinkSpan.setAttribute("class","author-link");
			hiperLinkSpan.setAttribute("href","#");
			hiperLinkSpan.innerHTML = "Redacción EC";
			spanDetalle.appendChild(hiperLinkSpan);

			divDetalle.appendChild(h2Detalle);
			divDetalle.appendChild(spanDetalle);

		var figureMd9 = document.createElement("figure");
		figureMd9.setAttribute("class","flow-image trash");

			var hiperFigure = document.createElement("a");
			hiperFigure.setAttribute("href","#");
			var imgFigureMd9 = document.createElement("img");
			imgFigureMd9.src = "http://elcomercio.pe/files/listing_ec_home_principal2x1/files/crop" +
					"/uploads/2017/08/07/5988fe48b570b.r_1502198176147.244-190-2765-1638.jpeg";
			hiperFigure.appendChild(imgFigureMd9);
			figureMd9.appendChild(hiperFigure);	

		colMd9.appendChild(divDetalle);
		colMd9.appendChild(figureMd9);

	//SEGUNDA COLUMNA DE ANCHO 3
	var colMd3 = document.createElement("div");
	colMd3.setAttribute("class","flow-1 col-sm-3");

		var rowMd3 = document.createElement("div");
		rowMd3.setAttribute("class","row");
			var divcolMd9 = document.createElement("div");
			divcolMd9.setAttribute("class","flow-1x1 mini-flow col-sm-9");
			agregarDivDetalleFigure(divcolMd9, "Magdalena: asaltan y balean a cambista en avenida Sucre", "https://img.elcomercio.pe/files/ec-modulo-mini/uploads/2017/08/07/5988f9fe4bbc8.jpeg" );
		rowMd3.appendChild(divcolMd9);	


		var rowMd3_2 = document.createElement("div");
		rowMd3_2.setAttribute("class","row");
			var divcolMd9 = document.createElement("div");
			divcolMd9.setAttribute("class","flow-1x1 mini-flow col-sm-9");
			agregarDivDetalleFigure(divcolMd9, "Invierno en Lima: humedad alcanzó el 98% esta mañana", "https://img.elcomercio.pe/files/ec-modulo-mini/files/crop/uploads/2017/08/08/5989c4ef50358.r_1502201081952.143-36-747-377.jpeg" );	
		rowMd3_2.appendChild(divcolMd9);	


		var rowMd3_3 = document.createElement("div");
		rowMd3_3.setAttribute("class","row");
			var divcolMd9 = document.createElement("div");
			divcolMd9.setAttribute("class","flow-1x1 mini-flow col-sm-9");
			agregarDivDetalleFigure(divcolMd9, "Terremoto de 6,5° en China: Los momentos de pánico durante sismo", "https://img.elcomercio.pe/files/ec-modulo-mini/uploads/2017/08/07/59891f2856889.jpeg" );	
		rowMd3_3.appendChild(divcolMd9);
	
	colMd3.appendChild(rowMd3);
	colMd3.appendChild(rowMd3_2);
	colMd3.appendChild(rowMd3_3);	

	//AGREGANDO AL DOM
	siteBody.appendChild(colMd9);
	siteBody.appendChild(colMd3);
	document.body.appendChild(siteBody);


	//****************************************************
	// ********* CREACION DEL FOOTER *********************
	//****************************************************
	var footer = document.createElement("footer");
	footer.setAttribute("class","site-footer");

		var gcsites = document.createElement("div");
		gcsites.setAttribute("class","gec-sites");

			var spanSites = document.createElement("span");
			spanSites.setAttribute("class","title");
			spanSites.innerHTML = "Red El Comercio";

			var ulSites = document.createElement("ul");

			var liFooter = null;
			for(var indice = 0; indice < 8; indice ++) {
				liFooter = document.createElement("li");
				liFooter.setAttribute("class","link");

				var hiperLinkMenu = document.createElement("a");
				hiperLinkMenu.href = "#";
				hiperLinkMenu.innerHTML = "foot " + (indice+1);
				liFooter.appendChild(hiperLinkMenu); 

				ulSites.appendChild(liFooter);
			}

			gcsites.appendChild(spanSites);
			gcsites.appendChild(ulSites);

	footer.appendChild(gcsites);	
	document.body.appendChild(footer);	
} 


function agregarDivDetalleFigure($elementDiv, textoNoticia, urlImg) {
	var divDetalle = document.createElement("div");
	divDetalle.setAttribute("class","flow-detail");

		var h2Detalle = document.createElement("h2");
		h2Detalle.setAttribute("class","flow-title");
		var hiperLinkH2 = document.createElement("a");
		hiperLinkH2.setAttribute("class","page-link");
		hiperLinkH2.setAttribute("href","#");
		hiperLinkH2.innerHTML = textoNoticia;
		h2Detalle.appendChild(hiperLinkH2);

		var spanDetalle = document.createElement("span");
		spanDetalle.setAttribute("class","flow-author");
		var hiperLinkSpan = document.createElement("a");
		hiperLinkSpan.setAttribute("class","author-link");
		hiperLinkSpan.setAttribute("href","#");
		hiperLinkSpan.innerHTML = "Redacción EC";
		spanDetalle.appendChild(hiperLinkSpan);

		divDetalle.appendChild(h2Detalle);
		divDetalle.appendChild(spanDetalle);

	var figureMd9 = document.createElement("figure");
	figureMd9.setAttribute("class","flow-image trash");

		var hiperFigure = document.createElement("a");
		hiperFigure.setAttribute("href","#");
		var imgFigureMd9 = document.createElement("img");
		imgFigureMd9.src = urlImg;
		hiperFigure.appendChild(imgFigureMd9);
		figureMd9.appendChild(hiperFigure);	

	$elementDiv.appendChild(divDetalle);
	$elementDiv.appendChild(figureMd9);	
}

	


