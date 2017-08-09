/*

1) Haciendo uso de funciones y new, realiza una "clase" Vikingo que almacene la información de un vikingo:

nombre
salud (0 - 1000)
potenciaAtaque (1 - 20)
valocidad (0 - 100)

2) Haz uso de prototype y añade un método .ataca(vikingo) a un vikingo para que ataque a su oponente.
el ataque quitara salud al vikingo atacado (la potencia de ataque del atacante)

3) Realiza una clase Batalla() que en su creación reciba dos vikingos.

Batalla tendrá un método iniciarPelea que realizará la pelea entre ambos vikingos.

Una batalla tendrá una serie de asaltos en los que:

atacará primero el que más valocidad tenga,
y quitará de salud al rival su potencia de ataque,
hasta que uno de los dos muera. (salud <= 0)

4) Crear la clase Arma() tenga un tipo: (espada/cuchillo...etc), una potencia (20 - 50) y un ataquesRestantes (0 -10).

5) Añade una propiedad armas a Vikingo para que pueda poseer varias armaspara su batalla.
Añade el método addArma() para añadir armas a los vikingos,

6) Modifica la función ataca del vikingo, para que si tiene armas disponibles ataque con el arma más potente.
Cada vez que se use un arma, debera restar uno a ataquesRestantes de ese arma.
Cuando el arma tenga 0 ataquesRestantes, el vikingo deberá abandonar el arma (añade la función abandonarArma al vikingo).

*/

function generarNumeroAleatorioEntre(minimo, maximo){
    var anchoFranjaNumerica = (maximo-minimo) + 1;
    var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

    return numero;
}

function generarTipoAleatorio(){
    var nombresAutores = ["espada", "cuchillo", "lanza", "Hacha"];
    var indice = generarNumeroAleatorioEntre(0, nombresAutores.length-1);

    return nombresAutores[indice];
}

function Vikingo(nombre) {
    this._nombre = nombre;
    this._salud = 1000;
    this._potenciaAtaque = generarNumeroAleatorioEntre(1,20);
    this._velocidad = generarNumeroAleatorioEntre(0,100);
    this._armas = [];
    this._dinero = generarNumeroAleatorioEntre(0,200);
}

function Batalla(vikingo1, vikingo2) {
    this._vikingo1 = vikingo1;
    this._vikingo2 = vikingo2; 
}

function Arma() {
    this._tipo = generarTipoAleatorio();
    this._potencia = generarNumeroAleatorioEntre(20,50);
    this._ataquesRestantes = generarNumeroAleatorioEntre(0,10); 
}

Vikingo.prototype.ataca = function(vikingo) {
    if(this._armas.length > 0) {
        var armaMasPotente = this.obtenerArmaMasPotente();
        armaMasPotente._ataquesRestantes -= 1;
        console.log("   ATACANDO CON: " + armaMasPotente._tipo + " - " + armaMasPotente._ataquesRestantes );

        vikingo._salud -= armaMasPotente._potencia; 

        if(armaMasPotente._ataquesRestantes <= 0) {
            this.abandonarArma(armaMasPotente);
        }
        
    } else {
        console.log("   PELEA A PUÑO LIMPIO.. ");
        vikingo._salud -= this._potenciaAtaque;     
    }

    if(vikingo._salud <= 0) {
        vikingo._salud = 0;

        this._dinero += vikingo._dinero;
        vikingo._dinero = 0;

        var vikingoActual = this;
        vikingo._armas.forEach(function(arma){
            vikingoActual._armas.push(arma);
        });        
        vikingo._armas = [];
    }
}

Vikingo.prototype.addArma = function() {
    this._armas.push(new Arma());
}

Vikingo.prototype.abandonarArma = function(arma) {
    this._armas.splice(this._armas.indexOf(arma),1);
}

Vikingo.prototype.obtenerArmaMasPotente = function() {
    var indiceArma = 0;
    var mayorPotencia = 0;
    for(var indice=0; indice<this._armas.length;indice++) {
        if(mayorPotencia > this._armas[indice]._potencia) {
            mayorPotencia = this._armas[indice]._potencia;
            indiceArma = indice;
        }
    }

    return this._armas[indiceArma];
}

Batalla.prototype.iniciarPelea = function() {
    console.log("***** INICIA PELEA *****");
    var atacaVikingo2 = this._vikingo1._velocidad < this._vikingo2._velocidad ? true : false;
    var peleas = 0;
    while(this._vikingo1._salud > 0 && this._vikingo2._salud > 0) {
        if(atacaVikingo2) {
            this._vikingo2.ataca(this._vikingo1);
            atacaVikingo2 = false;     
        } else {
            this._vikingo1.ataca(this._vikingo2);  
            atacaVikingo2 = true;
        }

        console.log("ROUND " + peleas++);
        console.log("SALUD VIKINGO 1: " + vikingo1._salud + " ,DINERO: " + vikingo1._dinero + " ,ARMAS: " + this._vikingo1._armas.length);
        console.log("SALUD VIKINGO 2: " + vikingo2._salud + " ,DINERO: " + vikingo2._dinero + " ,ARMAS: " + this._vikingo2._armas.length);
        console.log("******************************************************")
    }
}

var vikingo1 = new Vikingo("Vikingo 1");
vikingo1.addArma();
vikingo1.addArma();
vikingo1.addArma();
vikingo1.addArma();
vikingo1.addArma();
vikingo1.addArma();


var vikingo2 = new Vikingo("Vikingo 2");
vikingo2.addArma();
vikingo2.addArma();
vikingo2.addArma();
vikingo2.addArma();
vikingo2.addArma();
vikingo2.addArma();

var batalla = new Batalla(vikingo1, vikingo2);
batalla.iniciarPelea();


















