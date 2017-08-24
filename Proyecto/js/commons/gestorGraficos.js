class GestorGrafico {
	constructor() {

	}

	static pintarGraficoPie(data, element) {
		document.body.querySelector("#"+element).innerHTML = "";
		 Morris.Donut({
		  element: element,
		  data: data,
		  colors: ['#CB4B4B', '#4DA74D', '#EDC240', '#DA3732', '#E4762F', '#F7BE33', 
		  		'#f3b72e', '#3869c5', '#4686f4'],
		  formatter: function (x) { return x + "%"}
		}).on('click', function(i, row){
		  console.log(i, row);
		});
	}

	static pintarGraficoBarras(data, element) {
		document.body.querySelector("#"+element).innerHTML = "";
		 Morris.Bar({
		  element: element,
		  data: data,
		  xkey: 'x',
		  ykeys: ['y'],
		  labels: ['Cal.'],
		  barColors: function (row, series, type) {
		  	let colores = ['#CB4B4B', '#4DA74D', '#EDC240', '#DA3732', '#E4762F', '#F7BE33', 
		  		'#f3b72e', '#3869c5', '#4686f4'];		    
		    return colores[row.x];
		  },
		  xLabelAngle: 35
		});
	}

	static generarNumeroAleatorioEntre(minimo, maximo){
	    var anchoFranjaNumerica = (maximo-minimo) + 1;
	    var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

	    return numero;
	}
}