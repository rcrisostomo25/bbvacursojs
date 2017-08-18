class Pokemon {
    constructor(name, urlDetalle, image, weight, height) {
        this._name = name;
        this._urlDetalle = urlDetalle;
        this._image = image;
        this._weight = weight;
        this._height = height;
    }
}

class PokemonCollection {
    constructor(total, pokemons) {
        this._total = total;
        this._pokemons = pokemons;
    }
}

class Utilitario {
    constructor() {

    }

    static getEstructuraPanel(stringReplace) {
        let estructura =  `<!-- /.row -->
                            
                                <div class="col-lg-9">
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            $
                                        </div>
                                        <!-- /.panel-heading -->
                                        <div class="panel-body">
                                            <div class="table-responsive">

                                                <nav aria-label="...">
                                                  <ul class="pager">
                                                    <li><a id="anterior" href="#">< Atrás</a></li>
                                                    <li><label id="pageActual">Página actual: 1</label></li>
                                                    <li><a id="siguiente" href="#">Siguiente ></a></li>
                                                  </ul>
                                                </nav>
                                                <table class="table-users table table-striped table-bordered table-hover">
                                                    <thead>
                                                        @
                                                    </thead>
                                                    <tbody>
                                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                            <!-- /.table-responsive -->
                                        </div>
                                        <!-- /.panel-body -->
                                    </div>
                                    <!-- /.panel -->
                                </div>
                            
                            <!-- /.row --> `;

        return estructura.replace("@", stringReplace);                    
    }

    static closeModal(){
        var modal = document.body.querySelector("#contenedorModal");
        if(modal){
            modal.parentElement.removeChild(modal);
        }
    }

    static openModal(textoMostrar) {
        let contenedorModal = document.createElement("div");
        contenedorModal.id = "contenedorModal";
        contenedorModal.innerHTML = `
            <div class="modal fade in" id="myModal" role="dialog" style="display: block; padding-left: 0px;">
            <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" id="close-modal-button">×</button>
            <h4 class="modal-title">Detalle del Pokemon </h4>
            </div>
            <div class="modal-body">
                @
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default" id="close-modal-button2">Cerrar</button>
            </div>
            </div>

            </div>
            </div>
            <div class="modal-backdrop fade in"></div>
            `;

        contenedorModal.innerHTML = contenedorModal.innerHTML.replace("@",textoMostrar);    

        let botonCerrar = contenedorModal.querySelector("#close-modal-button");
        botonCerrar.addEventListener("click", () => this.closeModal());

        let botonCerrar2 = contenedorModal.querySelector("#close-modal-button2");
        botonCerrar2.addEventListener("click", () => this.closeModal());

        document.body.appendChild(contenedorModal);
    }
}






