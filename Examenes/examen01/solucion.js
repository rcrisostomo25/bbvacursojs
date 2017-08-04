/*

Vamos a realizar una biblioteca (Yujuuuuu!!)

1) Crea la clase Biblioteca, la cual deberá tener:
    - Nombre (String)
    - Secciones (Array)
    - Socios (Array)

2) Crea la clase Libro, la cual deberá tener:
    - Nombre (String)
    - Número de páginas (Number)
    - Autor (String)
    - Temática (String) (Puede ser Amor, Aventuras, Naturaleza, Historia o Viajes)

3) Crea la clase Sección (para la biblioteca) que tendrá:
    - Nombre (String)
    - Libros (Array)

5) Crea la clase Socio que tendrá:
    - Nombre (String)
    - Numero de socio (Number)
    - Libros (Array)

6) Instancia una nueva biblioteca
Añade 5 seciones a la biblioteca: Amor, Aventuras, Naturaleza, Historia, Viajes
Añade 100 socios aleatorios a la biblioteca
Genera 1000 libros aleatoriamente y añádelos a la biblioteca.
Para ello haz uso de una función añadirLibro(libro) que deberá estar en el objeto biblioteca.
Los libros deberán colocarse en la sección apropiada según su temática.

7) Añade el método ejecutarCiclo() dentro de un socio
En cada ciclo un socio dejará los libros que tenía alquilados y cogerá varios (aleatorio entre 1-3) de forma aleatoria.
Para coger libros deberá hacer uso de una funcion de Biblioteca llamada dameLibroAleatorio();
Para dejar libros deberá hacer uso de una función de Biblioteca llamada devolverLibro(libro);

8) Realiza la función ejecutarCiclo para la biblioteca
La función ejecutarCiclo de biblioteca, llamará a ejecutar ciclo de todos sus socios

8) Crea un intervalo que se encargue de llamar a ejecutarCiclo de biblioteca cada segundo
Crea una función imprimirEstado en biblioteca, que se encargue de imprimir el estado de toda la biblioteca.

Por ejemplo:

Biblioteca Municipal:

Sección Amor
    Numero de libros: 80
Sección Aventuras
    Numero de libros: 80
Sección Naturaleza
    Numero de libros: 80
Sección Historia
    Numero de libros: 80
Sección Viajes
    Numero de libros: 80

Total de libros en la biblioteca: 400
Total de libros prestados a los socios: 600

*/
// Funciones auxiliares
function generarNumeroAleatorioEntre(minimo, maximo){
    var anchoFranjaNumerica = (maximo-minimo) + 1;
    var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

    return numero;
}

function generarAutorAleatorio(){
    var nombresAutores = ["Carlos", "Daniel", "Fabian", "Juan Carlos", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran"];
    var indice = generarNumeroAleatorioEntre(0, nombresAutores.length-1);

    return nombresAutores[indice];
}

function agregarSeccionesBiblioteca(biblioteca){
    var nombresSecciones = ["Amor", "Aventura", "Naturaleza", "Historia", "Viajes"];
    for(var indiceSeccion= 0; indiceSeccion < nombresSecciones.length; indiceSeccion++ ) {
        var seccion = new Seccion(nombresSecciones[indiceSeccion]);
        biblioteca._secciones.push(seccion);
    }
}

function agregarSociosAleatorios(biblioteca, cantidad){
    for(var indiceSocio= 0; indiceSocio < cantidad; indiceSocio++ ) {
        var socio = new Socio("Socio " + indiceSocio, indiceSocio);
        biblioteca._socios.push(socio);
    }
}

function dameSeccionPorTematica(biblioteca, tematica){
    var seccion = null;
    var seccionEnMiBiblio = [];

    for(var indiceSeccion=0; indiceSeccion<biblioteca._secciones.length; indiceSeccion++){
        var seccionAleatoria = biblioteca._secciones[indiceSeccion];
        if(seccionAleatoria._nombre == tematica) {
            seccion = seccionAleatoria;
            break;
        }
    }

    return seccion;
}

function agregarLibrosAleatorios(biblioteca, cantidad){
    for(var indiceLibro= 0; indiceLibro < cantidad; indiceLibro++ ) {
        var libro = new Libro("Libro " + indiceLibro);
        var seccion = dameSeccionPorTematica(biblioteca, libro._tematica);
        seccion._libros.push(libro);
    }
}

function generarTematicaAleatorio(){
    var nombresTemas = ["Amor", "Aventura", "Naturaleza", "Historia", "Viajes"];
    var indice = generarNumeroAleatorioEntre(0, nombresTemas.length-1);

    return nombresTemas[indice];
}

//*******************************************************************************************************

function Biblioteca(nombre){
    this._nombre = nombre;
    this._secciones = [];
    this._socios = [];
};

function Libro(nombre){
    this._nombre = nombre;
    this._paginas = generarNumeroAleatorioEntre(500,1000);
    this._autor = generarAutorAleatorio();
    this._tematica = generarTematicaAleatorio();
};

function Seccion(nombre){
    this._nombre = nombre;
    this._libros = [];
};

function Socio(nombre, numeroSocio){
    this._nombre = nombre;
    this._numeroSocio = numeroSocio;
    this._libros = [];
};

//****************************************************
//****************************************************
//***************** BIBLIOTECA ***********************
//****************************************************
Biblioteca.prototype.ejecutarCiclo = function() {
    for(var indiceSocio= 0; indiceSocio < this._socios.length; indiceSocio++ ) {
        var socio = this._socios[indiceSocio];
        socio.ejecutarCiclo(this);
    }
    this.imprimirEstado();
};

Biblioteca.prototype.agregarLibro = function(cantidad) {
    for(var indiceLibro= 0; indiceLibro < cantidad; indiceLibro++ ) {
        var libro = new Libro("Libro " + indiceLibro);
        var seccion = dameSeccionPorTematica(this, libro._tematica);
        seccion._libros.push(libro);
    }
}; 

Biblioteca.prototype.dameLibroAleatorio = function() {
    var seccion = this._secciones[generarNumeroAleatorioEntre(0,this._secciones.length-1)];
    var libroAleatorio = seccion.dameLibroAleatorio(generarNumeroAleatorioEntre(0,seccion._libros.length-1)); 

    return libroAleatorio;
}; 

Biblioteca.prototype.devolverLibro = function(libro) {
    var seccion = dameSeccionPorTematica(this, libro._tematica);
    seccion._libros.push(libro); 
};

Biblioteca.prototype.imprimirEstado = function() {
    console.log(this._nombre);

    var totalAcumuladoLibros = 0;
    for(var indiceSeccion = 0; indiceSeccion < this._secciones.length; indiceSeccion ++) {
        var seccion = this._secciones[indiceSeccion];
        var totalLibros = seccion._libros.length;
        console.log("Seccion: " + seccion._nombre);
        console.log("   Numero de libros: " + totalLibros);
        totalAcumuladoLibros += totalLibros;
    } 

    console.log("Total de libros en la biblioteca: " + totalAcumuladoLibros);

    var totalAcumuladoLibrosPrestados = 0;
    for(var indiceSocio = 0; indiceSocio < this._socios.length; indiceSocio ++) {
        var socio = this._socios[indiceSocio];
        var totalPrestado = socio._libros.length; 
        totalAcumuladoLibrosPrestados += totalPrestado;
    } 

    console.log("Total de libros prestados los socios : " + totalAcumuladoLibrosPrestados);
};
//****************************************************
//****************************************************
//***************** SECCION **************************
//****************************************************
Seccion.prototype.dameLibroAleatorio = function(indiceLibro) {
    return this._libros[indiceLibro];
}; 

//****************************************************
//****************************************************
//***************** SOCIO ****************************
//****************************************************
Socio.prototype.ejecutarCiclo = function(biblioteca) { 
    this.dejarLibros(biblioteca);
    this.cogerLibros(biblioteca);
}; 

Socio.prototype.cogerLibros = function(biblioteca) {
    var iteraciones = generarNumeroAleatorioEntre(1,3);
    for(var iter = 0; iter < iteraciones; iter ++) {
        var libroAleatorio = biblioteca.dameLibroAleatorio();
        for(var indiceSeccion = 0; indiceSeccion < biblioteca._secciones.length; indiceSeccion ++) {
            var seccion = biblioteca._secciones[indiceSeccion];
            var indiceLibro = seccion._libros.indexOf(libroAleatorio);
            if(indiceLibro != -1) {
                seccion._libros.splice(indiceLibro,1);
                this._libros.push(libroAleatorio);
                break;
            }
        }    
    } 
}; 

Socio.prototype.dejarLibros = function(biblioteca) {
    for(var indiceLibro=this._libros.length-1 ; indiceLibro>=0 ; indiceLibro--) {
        var libro = this._libros[indiceLibro];
        biblioteca.devolverLibro(libro);
        this._libros.splice(indiceLibro,1);
    }
}; 

//Instancia una nueva biblioteca
var biblioteca = new Biblioteca("Biblioteca nacional");

//Añade 5 seciones a la biblioteca: Amor, Aventuras, Naturaleza, Historia, Viajes
agregarSeccionesBiblioteca(biblioteca);

//Añade 100 socios aleatorios a la biblioteca
agregarSociosAleatorios(biblioteca, 100);

//Genera 1000 libros aleatoriamente y añádelos a la biblioteca.
agregarLibrosAleatorios(biblioteca, 1000);

biblioteca.agregarLibro();

var intervalID;

intervalID = window.setInterval(function() {
        biblioteca.ejecutarCiclo();   
    }, 2000);

