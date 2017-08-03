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

function dameRecintoAleatorio(){
    var recinto = null;
    var recintosEnMiZoo = [];

    for(var indiceArea=0; indiceArea<zoo.areas.length; indiceArea++){
        var area = zoo.areas[indiceArea];
        for(var indiceRecintos=0; indiceRecintos<area.recintos.length; indiceRecintos++){
            var recinto = area.recintos[indiceRecintos];
            recintosEnMiZoo.push(recinto);
        }
    }

    var indiceAleatorio = generarNumeroAleatorioEntre(0, recintosEnMiZoo.length-1);
    recinto = recintosEnMiZoo[indiceAleatorio];

    return recinto;
}

function dameAnimalAleatorio(){
    var animal = null;
    var animalesEnMiZoo = [];

    for(var indiceArea=0; indiceArea<zoo.areas.length; indiceArea++){
        var area = zoo.areas[indiceArea];
        for(var indiceRecintos=0; indiceRecintos<area.recintos.length; indiceRecintos++){
            var recinto = area.recintos[indiceRecintos];
            for(var indiceAnimales=0; indiceAnimales<recinto.animales.length; indiceAnimales++){
                var animal = recinto.animales[indiceAnimales];
                animalesEnMiZoo.push(animal);
            }
        }
    }

    var indiceAleatorio = generarNumeroAleatorioEntre(0, animalesEnMiZoo.length-1);
    animal = animalesEnMiZoo[indiceAleatorio];

    return animal;
}

function damePersonaAleatorio(){
    var persona = null;
    var personasEnMiZoo = [];

    for(var indiceArea=0; indiceArea<zoo.areas.length; indiceArea++){
        var area = zoo.areas[indiceArea];
        for(var indiceRecintos=0; indiceRecintos<area.recintos.length; indiceRecintos++){
            var recinto = area.recintos[indiceRecintos];
            for(var indicePersonas=0; indicePersonas<recinto.personas.length; indicePersonas++){
                var persona = recinto.personas[indicePersonas];
                personasEnMiZoo.push(persona);
            }
        }
    }

    var indiceAleatorio = generarNumeroAleatorioEntre(0, personasEnMiZoo.length-1);
    persona = personasEnMiZoo[indiceAleatorio];

    return persona;
}

function dameArticuloAleatorio(){
    var articulo = null;
    var articulosEnMiZoo = [];

    for(var indiceArea=0; indiceArea<zoo.articulos.length; indiceArea++){
        var articulo = zoo.articulos[indiceArea];
        articulosEnMiZoo.push(articulo);
    }

    var indiceAleatorio = generarNumeroAleatorioEntre(0, articulosEnMiZoo.length-1);
    articulo = articulosEnMiZoo[indiceAleatorio];

    return articulo;
}

// Añade personas de forma aleatoria
function insertarPersonasAleatoriamente(numeroPersonas,zoo){
    for(var i=0; i<numeroPersonas; i++){
        var persona = crearPersonaAleatoria();
        var recintoAleatorio = dameRecintoAleatorio();

        if(recintoAleatorio.aforoMaximoPersonas>recintoAleatorio.personas.length){
           recintoAleatorio.personas.push(persona);

        } else {
            console.error(persona.nombre + " no cabe en el recinto " + recintoAleatorio.nombre);
        }
    }
}

// Añado los recintos a las áreas
function aniadirRecintoEnAreas(recinto, area, zoo) {
    area.recintos.push(recinto);
    area.aforoMaximo = area.aforoMaximo + recinto.aforoMaximoPersonas;
    if(zoo.areas.indexOf(area)!= -1) {
        zoo.aforo = zoo.aforo + area.aforoMaximo;
    }   
}

// Añado las areas al zoo
function aniadirAreaEnZoo(area, zoo) {
    zoo.areas.push(area);
    zoo.aforo = zoo.aforo + area.aforoMaximo;
}
//EJERCICIO 11
function ejecutarCicloGeneral() {
    ejecutarCicloVisitanteNuevo(zoo);
    ejecutarCicloAnimal();
    ejecutarCicloEnfermeria();
    comprarArticulosPersonas();
    detenerEjecucionInterval();
    numeroEjecucionesIntervalos++;
    console.log("CANTIDAD DE EJECUCIONES: " + numeroEjecucionesIntervalos);
}    

function ejecutarCicloVisitanteNuevo(zoo) {
    //console.log("Ingresando visitante...")
    var persona = crearPersonaAleatoria();

    loop:
    for(var indiceArea=0; indiceArea<zoo.areas.length; indiceArea++){
        var area = zoo.areas[indiceArea];
        for(var indiceRecintos=0; indiceRecintos<area.recintos.length; indiceRecintos++){
            var recintoAleatorio = area.recintos[indiceRecintos];
            if(recintoAleatorio.aforoMaximoPersonas>recintoAleatorio.personas.length){
                if(persona.edad >= 14 && persona.edad <= 65) {
                    if(persona.estudiante) {
                        persona.dinero = persona.dinero - 3;
                    } else {
                        persona.dinero = persona.dinero - 5;
                    }
                    //añadiendo dinero a caja
                    zoo.caja += (persona.estudiante) ? 3 : 5;      
                } 
                recintoAleatorio.personas.push(persona);
                break loop;

            } else {
                console.error(persona.nombre + " no cabe en el recinto " + recintoAleatorio.nombre);
            }
        }
    }
}

function ejecutarCicloAnimal() {
    for(var indiceArea=0; indiceArea<zoo.areas.length; indiceArea++){
        var area = zoo.areas[indiceArea];
        for(var indiceRecintos=0; indiceRecintos<area.recintos.length; indiceRecintos++){
            var recinto = area.recintos[indiceRecintos];

            for(var indiceAnimales=0; indiceAnimales<recinto.animales.length; indiceAnimales++){
                var animal = recinto.animales[indiceAnimales];
                var objetoEnfermeriaBuscar = {
                    animal: animal,
                    recinto: recinto        
                }  

                if(!estaContenidoEnEnfermeria(objetoEnfermeriaBuscar)) {
                    animal.hambre += 10;
                    if(animal.hambre >= 100) {
                        if(zoo.caja >= 1000) {
                            //Si el ZOO tiene dinero alimentará al animal
                            animal.hambre = 0;
                            zoo.caja -= 1000;

                        } else if(animal.hambre >= 150 && animal.hambre < 300 ) {
                            //Se comera a un visitante
                            var cantidadVisitantesRecinto = recinto.personas.length;
                            if(cantidadVisitantesRecinto > 0) {
                                var dineroPersona = recinto.personas[0].dinero;
                                zoo.caja += dineroPersona;
                                console.log("--- EL ANIMAL " + animal.nombre + " se comio a " + recinto.personas[0].nombre);
                                recinto.personas.splice(0,1);
                                animal.hambre = 0;
                                
                            }
                        } else if(animal.hambre > 300){
                            //Si tiene hambre mayor a 300 se come a otro animal
                            for(var indiceAnimalesOther=0; indiceAnimalesOther<recinto.animales.length; indiceAnimalesOther++){
                                if(indiceAnimalesOther != indiceAnimales) {
                                    console.log("--- EL ANIMAL " + animal.nombre + " se comio a " + recinto.animales[indiceAnimalesOther].nombre);
                                    recinto.animales.splice(indiceAnimalesOther,1);
                                    animal.hambre = 0;
                                    break;
                                }
                            }
                        }                        
                    }

                    animal.salud += (Math.random() < 0.5 ? 10 : -10);
                    if(animal.salud < 50) {
                        var objetoEnfermeria = {
                            animal: animal,
                            recinto: recinto        
                        }  
                        recinto.animales.splice(indiceAnimales,1);
                        zoo.enfermeria.push(objetoEnfermeria);

                    } else if(animal.salud >= 100){
                        animal.salud = 100;
                    } 
                }
            }
        }
    }
} 

function ejecutarCicloEnfermeria() {
    var arrayIndicesEliminar = [];
    for(var indiceEnfermeria = 0; indiceEnfermeria < zoo.enfermeria.length; indiceEnfermeria ++) {
        var objetoEnfermeria = zoo.enfermeria[indiceEnfermeria];
        objetoEnfermeria.animal.salud += 10;
        if(objetoEnfermeria.animal.salud >= 100) {
            arrayIndicesEliminar.push(indiceEnfermeria);
        }    
    }

    for(var indice=0; indice<arrayIndicesEliminar.length; indice++ ) {
        var animal = zoo.enfermeria[indice].animal;
        var recintoBuscar = zoo.enfermeria[indice].recinto;
        for(var indiceArea=0; indiceArea<zoo.areas.length; indiceArea++){
            var area = zoo.areas[indiceArea];
            for(var indiceRecintos=0; indiceRecintos<area.recintos.length; indiceRecintos++){
                var recinto = area.recintos[indiceRecintos];
                if(recinto == recintoBuscar) {
                    recinto.animales.push(animal);
                    zoo.enfermeria.splice(indice,1);        
                }
            }
        }
    }
}   

function estaContenidoEnEnfermeria(objetoEnfermeria) {
    for(var i=0; i<zoo.enfermeria.length; i++) {
        var enfermeria = zoo.enfermeria[i];
        if(objetoEnfermeria.animal == enfermeria.animal && objetoEnfermeria.recinto == enfermeria.recinto) {
            return true;
        }    
    }        
    return false;
}

function comprarArticulosPersonas() {
    var totalPersonas = 0;
    for(var indiceArea=0; indiceArea<zoo.areas.length; indiceArea++){
        var area = zoo.areas[indiceArea];
        for(var indiceRecintos=0; indiceRecintos<area.recintos.length; indiceRecintos++){
            var recinto = area.recintos[indiceRecintos];
            totalPersonas += recinto.personas.length;
        }
    }

    var cantidadCompradores = parseInt(totalPersonas * 0.15);
    for(var indiceComprar=0; indiceComprar<cantidadCompradores; indiceComprar++) {
        var persona = damePersonaAleatorio();
        var articulo = dameArticuloAleatorio();    
        if(articulo != undefined) {
            persona.dinero -= articulo.precio;
            persona.articulosComprados.push(articulo);

            quitarArticuloZoo(articulo);        
        }    
    }    
}   

function quitarArticuloZoo(articuloComprado) {
    for(var indiceArticulo=0; indiceArticulo<zoo.articulos.length; indiceArticulo++){
        var articulo = zoo.articulos[indiceArticulo];
        if(articuloComprado == articulo) {
            zoo.articulos.splice(indiceArticulo,1);        
        }    
    }
}  

function detenerEjecucionInterval() {
    if(numeroEjecucionesIntervalos > 50 ) {
        clearInterval(intervalID);
        for(var indiceArea=0; indiceArea<zoo.areas.length; indiceArea++){
            var area = zoo.areas[indiceArea];
            for(var indiceRecintos=0; indiceRecintos<area.recintos.length; indiceRecintos++){
                var recinto = area.recintos[indiceRecintos];
                for(var indicePersonas=recinto.personas.length; indicePersonas>= 0; indicePersonas--){
                    console.log("quitando personas");
                    var persona = recinto.personas[indicePersonas];
                    recinto.personas.splice(indicePersonas,1);
                }
            }
        }
    }
}   

function imprimirEstadoZoo() {
    console.log("ESTADO DE LOS ANIMALES Y PERSONAS");
    for(var indiceArea=0; indiceArea<zoo.areas.length; indiceArea++){
        var area = zoo.areas[indiceArea];
        console.log("-> AREA: " + area.nombre);
        for(var indiceRecintos=0; indiceRecintos<area.recintos.length; indiceRecintos++){
            var recinto = area.recintos[indiceRecintos];
            console.log("- RECINTO: " + recinto.nombre);
            console.log("- Cantidad de personas en el recinto: " + recinto.personas.length);
            console.log("- Animales en el recinto: ");
            for(var indiceAnimales=0; indiceAnimales<recinto.animales.length; indiceAnimales++){
                var animal = recinto.animales[indiceAnimales];
                console.log(" * " + animal.nombre);
            }
        }
    }

    console.log("");
    console.log("ESTADO DE LOS ANIMALES EN ENFERMERIA");
    for(var indiceEnfermeria = 0; indiceEnfermeria < zoo.enfermeria.length; indiceEnfermeria ++) {
        var objetoEnfermeria = zoo.enfermeria[indiceEnfermeria];
        console.log("- " + objetoEnfermeria.animal.nombre); 
    }

    console.log("");
    console.log("ESTADO DE LA TIENDA DEL ZOO");
    for(var indiceArea=0; indiceArea<zoo.articulos.length; indiceArea++){
        var articulo = zoo.articulos[indiceArea];
        console.log("- " + articulo.nombre); 
    }

    console.log("");
    console.log("ESTADO DE LA CAJA DEL ZOO: " + zoo.caja);

}

var zoo = {
    nombre: "El último zoológico",
    ubicacion: {},
    areas: [],
    aforo: 0,
    caja: 0,
    enfermeria: [],
    articulos: []
};

var ubicacion = {
    direccion: "Calle de los animalitos 123",
    ciudad: "Ciudad de México",
    pais: "México",
    telefono: 999888777
}

// Seteamos la ubicacion
zoo.ubicacion = ubicacion;

function crearArea(nombre){
    var area = {
        nombre: nombre,
        aforoMaximo: 0,
        recintos: [],
    };

    return area;
}

function crearRecinto(nombre, aforoMaximoPersonas, aforoMaximoAnimales, detalle){
    return {
        nombre: nombre,
        animales: [],
        personas: [],
        aforoMaximoPersonas: aforoMaximoPersonas,
        aforoMaximoAnimales: aforoMaximoAnimales,
        detalle: detalle
    };
}

function crearAnimal(nombre, especie, salud, hambre, pais){
    return {
        nombre: nombre,
        especie: especie,
        salud: salud,
        hambre: hambre,
        pais: pais
    };
}

function crearPersonaAleatoria(){
    return {
        nombre: generarNombreAleatorio(),
        edad: generarNumeroAleatorioEntre(1, 90),
        dinero: generarNumeroAleatorioEntre(0, 1000),
        estudiante: generarNumeroAleatorioEntre(0,1),
        articulosComprados: []
    }
}

function crearArticulo() {
    return {
        nombre: generarNombreArticuloAleatorio(),
        precio: generarNumeroAleatorioEntre(1, 90)
    }
}

function cargarArticulos() { 
    for(var indice = 0; indice < 11; indice++) {
        var articulo = crearArticulo();
        zoo.articulos.push(articulo);
    }    
}

// Creo animales
var tigreBlanco = crearAnimal("Tigre Blanco", "Felino", 5, 80, "Egipto");
var tigreNormal = crearAnimal("Tigre", "Felino", 5, 60, "Africa");
var avestruz = crearAnimal("Avestruz", "Avis Chilensis", 100, 100, "Chile");
var flamenco = crearAnimal("Flamenco", "Phoenicopteridae", 5, 100, "Colombia");

// Creo recintos 
var recintoTigres = crearRecinto("Jaula de tigres", 50, 30, "Jaula super reforzada con titanium");
var recintoAves = crearRecinto("Jaula para aves no voladoras", 100, 80, "Algunas aves se pelean mucho");    

// Creo areas
var areaMamiferos = crearArea("Mamíferos");
var areaAves = crearArea("Aves");

// Añado los animales a los recintos
recintoTigres.animales.push(tigreBlanco, tigreNormal);
recintoAves.animales.push(avestruz, flamenco);

//Añado recintos al area
aniadirRecintoEnAreas(recintoTigres, areaMamiferos, zoo);
aniadirRecintoEnAreas(recintoAves, areaAves, zoo);

//Añado las áreas al zoo
aniadirAreaEnZoo(areaMamiferos, zoo);
aniadirAreaEnZoo(areaAves, zoo);

cargarArticulos();

// Añado 100 personas
//insertarPersonasAleatoriamente(20);

var intervalID;
var numeroEjecucionesIntervalos = 0;
function ejecutarCiclo() {
    intervalID = window.setInterval(ejecutarCicloGeneral, 3000);
}

ejecutarCiclo();

console.log(zoo);