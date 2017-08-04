/*

Refactoriza el código realizado en el ejercicio 001__011:

Todos los objetos usados en nuestro zoo (area, recinto, animal, enfermería...) 
deberán pasar a ser clases que definamos mediante function y luego instanciemos mediante new.

Añade todas las funciones de cada clase (por ejemplo en animal: modificarSalud, ejecutarCicloAnimal, alimentar... etc)
al prototype de la clase, para no repetir las funciones en cada instancia de dicha clase

No olvides realizar este proceso con todas las clases que haya en nuestro Zoo.

*/

// Funciones auxiliares
function generarNumeroAleatorioEntre(minimo, maximo){
    var anchoFranjaNumerica = (maximo-minimo) + 1;
    var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

    return numero;
}

function generarNombreAleatorio(){
    var nombresNegados = ["Carlos", "Daniel", "Fabian", "Juan Carlos", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran"];
    var indice = generarNumeroAleatorioEntre(0, nombresNegados.length-1);

    return nombresNegados[indice];
}

function generarNombreArticuloAleatorio(){
    var nombresNegados = ["Gorro", "Polo", "Pelota", "Vasos", "Posters", "Fotos", "Gaseosas", "Comida", "Helados", "Boletos", "Mochila"];
    var indice = generarNumeroAleatorioEntre(0, nombresNegados.length-1);

    return nombresNegados[indice];
}

// Añado los recintos a las áreas
function aniadirRecintoEnAreas(recinto, area, zoo) {
    area._recintos.push(recinto);
    area._aforoMaximo = area._aforoMaximo + recinto._aforoMaximoPersonas;
    if(zoo._areas.indexOf(area)!= -1) {
        zoo._aforo = zoo._aforo + area._aforoMaximo;
    }   
}

// Añado las areas al zoo
function aniadirAreaEnZoo(area, zoo) {
    zoo._areas.push(area);
    zoo._aforo = zoo._aforo + area._aforoMaximo;
}

function cargarArticulos() {
    for(var indice = 0; indice < 11; indice++) {
        var articulo = new Articulo();
        zoo._articulos.push(articulo);
    }    
}

function dameRecintoAleatorio(){
    var recinto = null;
    var recintosEnMiZoo = [];

    for(var indiceArea=0; indiceArea<zoo._areas.length; indiceArea++){
        var area = zoo._areas[indiceArea];
        for(var indiceRecintos=0; indiceRecintos<area._recintos.length; indiceRecintos++){
            var recinto = area._recintos[indiceRecintos];
            recintosEnMiZoo.push(recinto);
        }
    }

    var indiceAleatorio = generarNumeroAleatorioEntre(0, recintosEnMiZoo.length-1);
    recinto = recintosEnMiZoo[indiceAleatorio];

    return recinto;
}

function dameArticuloAleatorio(){
    var articulo = null;
    var articulosEnMiZoo = [];

    for(var indiceArea=0; indiceArea<zoo._articulos.length; indiceArea++){
        var articulo = zoo._articulos[indiceArea];
        articulosEnMiZoo.push(articulo);
    }

    var indiceAleatorio = generarNumeroAleatorioEntre(0, articulosEnMiZoo.length-1);
    articulo = articulosEnMiZoo[indiceAleatorio];

    return articulo;
}

function quitarArticuloZoo(articuloComprado) {
    for(var indiceArticulo=zoo._articulos.length-1 ; indiceArticulo >= 0; indiceArticulo--){
        var articulo = zoo._articulos[indiceArticulo];
        if(articuloComprado == articulo) {
            zoo._articulos.splice(indiceArticulo,1);        
        }    
    }
} 

function imprimirEstadoZoo() {
    console.log("*** ESTADO DE LOS ANIMALES Y PERSONAS ***");
    for(var indiceArea=0; indiceArea<zoo._areas.length; indiceArea++){
        var area = zoo._areas[indiceArea];
        console.log("-> AREA: " + area._nombre);
        for(var indiceRecintos=0; indiceRecintos<area._recintos.length; indiceRecintos++){
            var recinto = area._recintos[indiceRecintos];
            console.log("- RECINTO: " + recinto._nombre);
            console.log("- Cantidad de personas en el recinto: " + recinto._personas.length);
            console.log("- Animales en el recinto: ");
            for(var indiceAnimales=0; indiceAnimales<recinto._animales.length; indiceAnimales++){
                var animal = recinto._animales[indiceAnimales];
                console.log(" * " + animal._nombre);
            }
        }
    }

    console.log("");
    console.log("ESTADO DE LOS ANIMALES EN ENFERMERIA");
    for(var indiceEnfermeria = 0; indiceEnfermeria < zoo._enfermeria.length; indiceEnfermeria ++) {
        var objetoEnfermeria = zoo._enfermeria[indiceEnfermeria];
        console.log("- " + objetoEnfermeria._animal._nombre); 
    }

    console.log("");
    console.log("ESTADO DE LA TIENDA DEL ZOO");
    for(var indiceArea=0; indiceArea<zoo._articulos.length; indiceArea++){
        var articulo = zoo._articulos[indiceArea];
        console.log("- " + articulo.nombre); 
    }

    console.log("");
    console.log("ESTADO DE LA CAJA DEL ZOO: " + zoo._caja);

}

//----------------------------------------------------------------
//----------------------------------------------------------------
//----------------------------------------------------------------


function Animal(nombre, especie, salud, hambre, pais){
    this._nombre = nombre;
    this._especie = especie;
    this._salud = salud;
    this._hambre = hambre;
    this._pais = pais;
};

function Zoo(nombre, ubicacion){
    this._nombre = nombre;
    this._ubicacion = ubicacion;
    this._areas = [];
    this._aforo = 0;
    this._caja = 0;
    this._enfermeria = new Enfermeria();
    this._articulos = [];
};

function Ubicacion(direccion, ciudad, pais, telefono){
    this._direccion = direccion;
    this._ciudad = ciudad;
    this._pais = pais;
    this._telefono = telefono;
};

function Enfermeria() {
    this._pacientes = [];
};

function Paciente(animal, recinto) {
    this._animal = animal;
    this._recinto = recinto;
};

function Area(nombre){
    this._nombre = nombre;
    this._aforoMaximo = 0;
    this._recintos = [];
};

function Recinto(nombre, aforoMaximoPersonas, aforoMaximoAnimales, detalle){
    this._nombre = nombre;
    this._animales = [];
    this._personas = [];
    this._aforoMaximoPersonas = aforoMaximoPersonas;
    this._aforoMaximoAnimales = aforoMaximoAnimales;
    this._detalle = detalle;
};

function Persona(){
    this._nombre = generarNombreAleatorio();
    this._edad = generarNumeroAleatorioEntre(1, 90);
    this._dinero = generarNumeroAleatorioEntre(0, 1000);
    this._estudiante = generarNumeroAleatorioEntre(0,1);
    this._articulosComprados = [];
};

function Articulo(){
    this._nombre = generarNombreArticuloAleatorio();
    this._precio = generarNumeroAleatorioEntre(1, 90)
};

//****************************************************
//****************************************************
//***************** ZOO ******************************
//****************************************************

Zoo.prototype.ejecutarCiclo = function() {
    console.log("CANTIDAD DE EJECUCIONES..." + numeroEjecucionesIntervalos+ " CAJA: " +this._caja);
    for(var indiceArea=0; indiceArea<this._areas.length; indiceArea++){
        var area = this._areas[indiceArea];
        area.ejecutarCiclo();
    }    

    this.generarVisitante();
    this.aumentarSaludAnimalEnfermeria();
    this.comprobarCierreZoo(30);
    numeroEjecucionesIntervalos++;
};

Zoo.prototype.generarVisitante = function () {
    var persona = new Persona();
    var recintoAleatorio = dameRecintoAleatorio();

    if(recintoAleatorio._aforoMaximoPersonas>recintoAleatorio._personas.length){
        if(persona._edad >= 14 && persona._edad <= 65) {
            if(persona._estudiante) {
                persona._dinero = persona._dinero - 3;
            } else {
                persona._dinero = persona._dinero - 5;
            }
            //añadiendo dinero a caja
            var dinero = (persona._estudiante) ? 3 : 5;
            this._caja = this._caja + dinero;      
        } 
        recintoAleatorio._personas.push(persona);

    } else {
        console.error(persona._nombre + " no cabe en el recinto " + recintoAleatorio._nombre);
    }     
};

Zoo.prototype.aumentarSaludAnimalEnfermeria = function() {
    this._enfermeria.ejecutarCiclo();    
};

Zoo.prototype.comprobarCierreZoo = function(cantidadEjecuciones) {
    if(numeroEjecucionesIntervalos > cantidadEjecuciones ) {
        clearInterval(intervalID);
        for(var indiceArea=0; indiceArea<this._areas.length; indiceArea++){
            var area = this._areas[indiceArea];
            for(var indiceRecintos=0; indiceRecintos<area._recintos.length; indiceRecintos++){
                var recinto = area._recintos[indiceRecintos];
                recinto._personas = [];
            }
        }
    }   
};

//****************************************************
//****************************************************
//***************** ENFERMERIA ***********************
//****************************************************
Enfermeria.prototype.ejecutarCiclo = function() {
   for(var indiceEnfermeria = 0; indiceEnfermeria < this._pacientes.length; indiceEnfermeria ++) {
        var paciente = this._pacientes[indiceEnfermeria];
        paciente.aumentarSalud();
   }
   this.quitarAnimalesSanos();
};

Enfermeria.prototype.quitarAnimalesSanos = function() {
   for(var indicePaciente = this._pacientes.length - 1; indicePaciente >= 0  ; indicePaciente --) {
        var paciente = this._pacientes[indicePaciente];
        if(paciente._animal._salud >= 100) {
            paciente._recinto._animales.push(paciente._animal);
            this._pacientes.splice(indicePaciente,1);        
        }
   }
};

//****************************************************
//****************************************************
//***************** PACIENTE ***********************
//****************************************************
Paciente.prototype.aumentarSalud = function() {
   this._animal._salud += 10;
};

//****************************************************
//****************************************************
//***************** AREA **************************
//****************************************************

Area.prototype.ejecutarCiclo = function() {
    for(var indiceArea=0; indiceArea<this._recintos.length; indiceArea++){
        var recinto = this._recintos[indiceArea];
        recinto.ejecutarCiclo();
    }    
};

//****************************************************
//****************************************************
//***************** RECINTO **************************
//****************************************************

Recinto.prototype.ejecutarCiclo = function() {
    for(var indiceAnimal=0; indiceAnimal<this._animales.length; indiceAnimal++){
        var animal = this._animales[indiceAnimal];
        animal.ejecutarCiclo(zoo,this);
    }
    for(var indicePersona=0; indicePersona<this._personas.length; indicePersona++){
        var persona = this._personas[indicePersona];
        persona.ejecutarCiclo();
    }    
};

//****************************************************
//****************************************************
//***************** PERSONA **************************
//****************************************************

Persona.prototype.ejecutarCiclo = function() {
    this.comprarArticulo();       
};

Persona.prototype.comprarArticulo = function() {
    var articulo = dameArticuloAleatorio();  
    if(articulo != undefined) {
        this._dinero -= articulo.precio;
        this._articulosComprados.push(articulo);
        quitarArticuloZoo(articulo);        
    }
};

//****************************************************
//****************************************************
//***************** ANIMAL **************************
//****************************************************
Animal.prototype.ejecutarCiclo = function(zoo, recinto){
    this.ganarPerderSaludAleatorioYMandarEnfermeria(zoo._enfermeria, recinto);
    this.aumentarHambre();
    this.alimentarAnimal(zoo);
    this.comerVisitante(recinto);
    this.comerOtroAnimal(recinto);
};

Animal.prototype.ganarPerderSaludAleatorioYMandarEnfermeria = function(enfermeria, recinto){
    var aumentoDeSalud = generarNumeroAleatorioEntre(-10, 10);
    this._salud = this._salud + aumentoDeSalud;

    if(this._salud>100){
        this._salud = 100;
    }

    if(this._salud<0){
        this._salud = 0;
    }

    if(this._salud<50){
        var paciente = new Paciente(this, recinto);
        enfermeria._pacientes.push(paciente);
        var indiceEnRecinto = recinto._animales.indexOf(this);
        recinto._animales.splice(indiceEnRecinto, 1);
    }
};

Animal.prototype.aumentarHambre = function(){
    this._hambre = this._hambre + 10;
};

Animal.prototype.alimentarAnimal = function(zoo){
    if(zoo._caja >= 1000) {
        //Si el ZOO tiene dinero alimentará al animal
        this._hambre = 0;
        zoo._caja -= 1000;
    }
};

Animal.prototype.comerVisitante = function(recinto){
    if(this._hambre >= 150 && this._hambre < 300 ) {
        //Se comera a un visitante
        var cantidadVisitantesRecinto = recinto._personas.length;
        if(cantidadVisitantesRecinto > 0) {
            var dineroPersona = recinto._personas[0]._dinero;
            zoo._caja += dineroPersona;
            console.log("--- EL ANIMAL " + this._nombre + " se comio a " + recinto._personas[0]._nombre);
            recinto._personas.splice(0,1);
            this._hambre = 0;
        }
    }
};

Animal.prototype.comerOtroAnimal = function(recinto){
    if(this._hambre > 300){
        //Si tiene hambre mayor a 300 se come a otro animal
        var indiceAnimales = recinto._animales.indexOf(this); 
        for(var indiceAnimalesOther=0; indiceAnimalesOther<recinto._animales.length; indiceAnimalesOther++){
            if(indiceAnimalesOther != indiceAnimales) {
                console.log("--- EL ANIMAL " + this._nombre + " se comio a " + recinto._animales[indiceAnimalesOther]._nombre);
                recinto._animales.splice(indiceAnimalesOther,1);
                this._hambre = 0;
                break;
            }
        }
    } 
};


var ubicacion = new Ubicacion("Calle de los animalitos 123","Ciudad de México","Mexico",999888777);
var zoo = new Zoo("El último zoológico",ubicacion);

// Creo animales
var tigreBlanco = new Animal("Tigre Blanco", "Felino", 5, 80, "Egipto");
var tigreNormal = new Animal("Tigre", "Felino", 5, 60, "Africa");
var avestruz = new Animal("Avestruz", "Avis Chilensis", 100, 100, "Chile");
var flamenco = new Animal("Flamenco", "Phoenicopteridae", 5, 100, "Colombia");

// Creo recintos 
var recintoTigres = new Recinto("Jaula de tigres", 50, 30, "Jaula super reforzada con titanium");
var recintoAves = new Recinto("Jaula para aves no voladoras", 100, 80, "Algunas aves se pelean mucho");    

// Creo areas
var areaMamiferos = new Area("Mamíferos");
var areaAves = new Area("Aves");

// Añado los animales a los recintos
recintoTigres._animales.push(tigreBlanco, tigreNormal);
recintoAves._animales.push(avestruz, flamenco);

//Añado recintos al area
aniadirRecintoEnAreas(recintoTigres, areaMamiferos, zoo);
aniadirRecintoEnAreas(recintoAves, areaAves, zoo);

//Añado las áreas al zoo
aniadirAreaEnZoo(areaMamiferos, zoo);
aniadirAreaEnZoo(areaAves, zoo);

//cargando articulos
cargarArticulos();

console.log(zoo);

//FUNCIONES DEL EJERCICIO
var intervalID;
var numeroEjecucionesIntervalos = 0;

intervalID = window.setInterval(function() {
        zoo.ejecutarCiclo();   
    }, 3000);

