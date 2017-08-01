/*

Realiza la modelización de un Zoológico

El zoológico deberá tener un nombre, una ubicación, un aforo máximo, un horario... ¡y todo lo que se te pueda ocurrir!

El zoológico deberá tener varias áreas:

- Reptiles
- Aves
- Mamíferos
- Peces

con distintos recintos, por ejemplo:

- Reptiles
    - Serpientes
    - Lagartos
- Aves
    - Aves pequeñas
    - Aves tropicales

    ... etcétera

Cada recinto debe tener un nombre, una capacidad máxima de animales, aforo maximo de personas y un conjunto de animales.

Modeliza el zoológico lo más completo que puedas.

*/

var zoo = {
    nombre: "El último zoológico",
    ubicacion: {},
    areas: [],
    aforo: 120
    // COMPLETAR
};

zoo.ubicacion = {
    direccion: "Calle de los animales 5",
    ciudad: "París",
    pais: "Francia",
    // COMPLETAR
}

var area1 = {
    nombre: "Reptiles",
    aforoMaximoZona: 30,
    recintos: [], // son como jaulas
    // COMPLETAR
}

var area2 = {
    nombre: "Aves",
    aforoMaximoZona: 40,
    recintos: [], // son como jaulas
    // COMPLETAR
}

var area3 = {
    nombre: "Mamíferos",
    aforoMaximoZona: 20,
    recintos: [], // son como jaulas
    // COMPLETAR
}

var area4 = {
    nombre: "Peces",
    aforoMaximoZona: 50,
    recintos: [], // son como jaulas
    // COMPLETAR
}

zoo.areas.push(area1);
zoo.areas.push(area2);
zoo.areas.push(area3);
zoo.areas.push(area4);

var recinto1 =  {
    nombre: "Serpientes",
    aforoMaximoZona: 50
}

var recinto2 =  {
    nombre: "Lagartos",
    aforoMaximoZona: 50
}

var recinto3 =  {
    nombre: "Aves pequeñas",
    aforoMaximoZona: 50
}

var recinto4 =  {
    nombre: "Aves tropicales",
    aforoMaximoZona: 50
}

area1.recintos.push(recinto1);
area1.recintos.push(recinto2);

area2.recintos.push(recinto3);
area2.recintos.push(recinto4);
// COMPLETAR

console.log(zoo);