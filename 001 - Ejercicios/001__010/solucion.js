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

// Añade personas de forma aleatoria
function insertarPersonasAleatoriamente(numeroPersonas){
    for(var i=0; i<numeroPersonas; i++){
        var persona = crearPersonaAleatoria();
        var recintoAleatorio = dameRecintoAleatorio();

        if(recintoAleatorio.aforoMaximoPersonas>recintoAleatorio.personas.length){
            recintoAleatorio.personas.push(persona);
        }else{
            console.error(persona.nombre + " no cabe en el recinto " + recintoAleatorio.nombre);
        }
    }
}

// Añado los recintos a las áreas
function aniadirRecintoEnAreas(recinto, area) {
    area.recintos.push(recintoTigres);
    area.aforoMaximo = area.aforoMaximo + recinto.aforoMaximoPersonas;
}

// Añado las areas al zoo
function aniadirAreaEnZoo(area, zoo) {
    zoo.areas.push(area);
    zoo.aforo = zoo.aforo + area.aforoMaximo;
}

var zoo = {
    nombre: "El último zoológico",
    ubicacion: {},
    areas: [],
    aforo: 0,
};

var ubicacion = {
    direccion: "Calle de los animalitos 123",
    ciudad: "Ciudad de México",
    pais: "México",
    telefono: 999888777
}

// Seteamos la ubicacion
zoo.ubicacion = ubicacion;

function crearArea(nombre, aforo){
    var area = {
        nombre: nombre,
        aforoMaximo: aforo,
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
        dinero: generarNumeroAleatorioEntre(0, 1000)
    }
}

// Creo animales
var tigreBlanco = crearAnimal("Tigre Blanco", "Felino", 100, 80, "Egipto");
var tigreNormal = crearAnimal("Tigre", "Felino", 90, 60, "Africa");
var avestruz = crearAnimal("Avestruz", "Avis Chilensis", 100, 100, "Chile");
var flamenco = crearAnimal("Flamenco", "Phoenicopteridae", 5, 100, "Colombia");

// Creo recintos 
var recintoTigres = crearRecinto("Jaula de tigres", 50, 30, "Jaula super reforzada con titanium");
var recintoAves = crearRecinto("Jaula para aves no voladoras", 100, 80, "Algunas aves se pelean mucho");

// Creo areas
var areaMamiferos = crearArea("Mamíferos", 0);
var areaAves = crearArea("Aves", 0);

// Añado los animales a los recintos
recintoTigres.animales.push(tigreBlanco, tigreNormal);
recintoAves.animales.push(avestruz, flamenco);

//Añado recintos al area
aniadirRecintoEnAreas(recintoTigres, areaMamiferos);
aniadirRecintoEnAreas(recintoAves, areaAves);

//Añado las áreas al zoo
aniadirAreaEnZoo(areaMamiferos, zoo);
aniadirAreaEnZoo(areaAves, zoo);

// Añado 100 personas
insertarPersonasAleatoriamente(100);

console.log(zoo);