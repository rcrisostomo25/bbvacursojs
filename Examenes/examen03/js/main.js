class Pokedex {
    constructor() {
        this._container = null;
        this._divListadoPokemons = null;
        this._apiClient = null;
        this._pokemons = [];
        this._paginaActual = 0;
        this._totalPokemons = 0;
        this._pokemonApiClient = null;
        this._paginacion = 20;
        this.postConstructor();
    }

    postConstructor() {
        this._apiClient = new APIClient();
        this._pokemonApiClient = new PokemonApiClient(this._apiClient);
    }

    init() {
        this.crearEstructuraPrincipal();
        this.pintarEstructuraPrincipal();
        this.getAllPokemonsAndPaint(this._paginaActual);
    }

    crearEstructuraPrincipal() {
        this._container = document.createElement("div");
        this._container.className = "container";

        this._divListadoPokemons = document.createElement("div");
        this._divListadoPokemons.className = "row listado-pokemons";

        this._container.appendChild(this._divListadoPokemons);
        document.body.appendChild(this._container);
    }

    pintarEstructuraPrincipal() {
        let estructura = Utilitario.getEstructuraPanel(`<th>Nombre</th>
                                                            <th>Acciones</th>`);

        this._divListadoPokemons.innerHTML = estructura.replace("$", "La Pokedex Xanxa!");

        let btnAnterior = this._divListadoPokemons.querySelector("#anterior");
        btnAnterior.addEventListener("click", () => this.anterior());

        let btnSiguiente = this._divListadoPokemons.querySelector("#siguiente");
        btnSiguiente.addEventListener("click", () => this.siguiente());
    }

    siguiente() {
        if(this._paginaActual < parseInt(this._totalPokemons / this._paginacion)) {
            this._paginaActual += 1;
            this.getAllPokemonsAndPaint(this._paginaActual);
        }
    }

    anterior() {
        if(this._paginaActual > 0) {
            this._paginaActual -= 1;
            this.getAllPokemonsAndPaint(this._paginaActual);
        }
    }

    getAllPokemonsAndPaint(paginaActual) {
        this._pokemonApiClient.getPokemonAtPage(paginaActual).then((data) => {
            this._totalPokemons = data._total;
            this.pintarPokemones(data._pokemons);

            let label = this._divListadoPokemons.querySelector("#pageActual");
            label.innerHTML = "Página actual: " + (this._paginaActual + 1);
        });
    }

    pintarPokemones(data) {
        let tbody = this._divListadoPokemons.querySelector("tbody");
        tbody.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
            let pokemon = data[i];
            let row = this.getRowForPokemon(pokemon);
            tbody.appendChild(row);
        }
    }

    getRowForPokemon(pokemon) {
        let tr = document.createElement("tr");

        let td1 = document.createElement("td");
        td1.innerHTML = pokemon._name;
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        let button = document.createElement("button");
        button.className = "btn btn-success";
        button.innerHTML = "Ver Detalles";

        button.addEventListener("click", (e) => {
            e.stopPropagation();
            this.mostrarDetalle(pokemon);
        });

        td2.appendChild(button);
        tr.appendChild(td2);

        return tr;
    }

    mostrarDetalle(pokemon) {
        this._pokemonApiClient.getPokemonByUrl(pokemon._urlDetalle).then((data) => {
            let texto = "";
            texto += "<center><img src=" + data._image + "></img></center>";
            texto += "<p><strong>Nombre: </strong>" + pokemon._name + "</p>";
            texto += "<p><strong>Peso: </strong>" + data._weight + "</p>";
            texto += "<p><strong>Altura: </strong>" + data._height + "</p>";
            Utilitario.openModal(texto);
        });
    }
}

window.onload = function() {
    let pk = new Pokedex();
    pk.init();
}