window.onload = function() {

	//****************************************************
	// ********* CREACION DE CUERPO HEADER ***************
	//****************************************************
	var siteHeader = document.createElement("header");
	document.body.appendChild(siteHeader);

	var imgHeader = document.createElement("img");
	imgHeader.src = "https://www.visualstudio.com/wp-content/uploads/2016/10/VS-IDE-Javascript-hero_636x350.png";
	imgHeader.setAttribute("width","200px");
	imgHeader.setAttribute("heigth","100px");

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
			spanSites.innerHTML = "Ronal @Copyright 2017";

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


	


