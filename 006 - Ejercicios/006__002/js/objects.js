class Utilitario {
    constructor() {

    }

    static getEstructuraPanel(stringReplace) {
        let estructura =  `<!-- /.row -->
                            
                                <div class="col-lg-12">
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            $
                                        </div>
                                        <!-- /.panel-heading -->
                                        <div class="panel-body">
                                            <div class="table-responsive">
                                                <button type="button" id="regresar" class="btn btn-primary">Regresar</button>
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

    static getEstructuraPanelUser(stringReplace) {
        let estructura =  `<!-- /.row -->
                            
                                <div class="col-lg-12">
                                    <div class="panel panel-primary">
                                        <div class="panel-heading">
                                            $
                                        </div>
                                        <!-- /.panel-heading -->
                                        <div class="panel-body">
                                            <div class="table-responsive">
                                                
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
            <h4 class="modal-title">Modal Header</h4>
            </div>
            <div class="modal-body">
                @
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default" id="close-modal-button2">Close</button>
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

class User {
    constructor(id, name, username, email, address, phone, website, company) {
        this._id = id;
        this._name = name;
        this._username = username;
        this._email = email;
        this._address = address;
        this._phone = phone;
        this._website = website;
        this._company = company;
    }
}

class Address {
    constructor(street, suite, city, zipCode, geo) {
        this._street = street;
        this._suite = suite;
        this._city = city;
        this._zipCode = zipCode;
        this._geo = geo;
    }
}

class Geo {
    constructor(lat, lng) {
        this._lat = lat;
        this._lng = lng;
    }
}

class Company {
    constructor(name, catchPhrase, bs) {
        this._name = name;
        this._catchPhrase = catchPhrase;
        this._bs = bs;
    }
}

class Post {
    constructor(userId, id, title, body) {
        this._userId = userId;
        this._id = id;
        this._title = title;
        this._body = body;
    }
}

class Comment {
    constructor(postId, id, name, email, body) {
        this._postId = postId;
        this._id = id;
        this._name = name;
        this._email = email;
        this._body = body;
    }
}






