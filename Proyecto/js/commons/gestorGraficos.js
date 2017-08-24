class GestorGrafico {
	constructor() {

	}

	static pintarGraficoPie(data, element) {
		 Morris.Donut({
		  element: element,
		  data: data,
		  formatter: function (x) { return x + "%"}
		}).on('click', function(i, row){
		  console.log(i, row);
		});
	}

	static pintarGraficoBarras(data, element) {
		 Morris.Bar({
		  element: element,
		  data: data,
		  xkey: 'x',
		  ykeys: ['y'],
		  labels: ['Y'],
		  barColors: function (row, series, type) {
		    if (type === 'bar') {
		      var R = Math.floor((Math.random() * 256));
		      var G = Math.floor((Math.random() * 256));
		      return 'rgb(' + R + ','+ G +',0)';
		    }
		    else {
		      return '#000';
		    }
		  },
		  xLabelAngle: 35
		});
	}
}