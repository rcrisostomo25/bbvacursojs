class GestorPageHtml {
    constructor() {

    }

    static getEstructuraLogin() {
        let estructura =  `<div class="col-md-4 col-md-offset-4">
                            <div class="login-banner text-center">
                                <h1><i class="fa fa-gears"></i> Restaurant Admin</h1>
                            </div>
                            <div class="portlet portlet-green">
                                <div class="portlet-heading login-heading">
                                    <div class="portlet-title">
                                        <h4><strong>Login</strong>
                                        </h4>
                                    </div>
                                    <div class="portlet-widgets">
                                        <button id="btnCrearCuenta" class="btn btn-white btn-xs"><i class="fa fa-plus-circle"></i> Nuevo usuario</button>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="portlet-body">
                                    <form accept-charset="UTF-8" role="form">
                                        <fieldset>
                                            <div class="form-group">
                                                <input id="txtUsername" class="form-control" placeholder="Username" name="username" type="text">
                                            </div>
                                            <div class="form-group">
                                                <input id="txtPassword" class="form-control" placeholder="Password" name="password" type="password" value="">
                                            </div>
                                            <div class="checkbox">
                                                <label>
                                                    <input id="chkRecordar" name="remember" type="checkbox" value="Remember Me">Remember Me
                                                </label>
                                            </div>
                                            <br>
                                            <a id="btnLogin" href="#" class="btn btn-lg btn-green btn-block">Sign In</a>
                                        </fieldset>
                                        <br>
                                        <p class="small">
                                            <a href="#">Forgot your password?</a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>`;

        return estructura;                    
    }

    static getEstructuraCrearUsuario() {
        let estructura =  `<div class="col-md-4 col-md-offset-4">
                            <div class="login-banner text-center">
                                <h1><i class="fa fa-gears"></i> Restaurant Admin</h1>
                            </div>
                            <div class="portlet portlet-green">
                                <div class="portlet-heading login-heading">
                                    <div class="portlet-title">
                                        <h4><strong>Crear Usuario</strong>
                                        </h4>
                                    </div>
                                    <div class="portlet-widgets">
                                        <button id="btnCancelar" class="btn btn-white btn-xs"><i class="fa fa-ban"></i> Cancelar</button>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="portlet-body">
                                    <form accept-charset="UTF-8" role="form">
                                        <fieldset>
                                            <div class="form-group">
                                                <input id="txtEmail" class="form-control" placeholder="E-mail" name="email" type="email" autofocus>
                                            </div>
                                            <div class="form-group">
                                                <input id="txtApellidos" class="form-control" placeholder="Apellidos" name="apellidos" type="text" value="">
                                            </div>
                                            <div class="form-group">
                                                <input id="txtNombre" class="form-control" placeholder="Nombre" name="nombre" type="text" value="">
                                            </div>
                                            <div class="form-group">
                                                <input id="txtUsername" class="form-control" placeholder="Username" name="username" type="text" value="">
                                            </div>
                                            <div class="form-group">
                                                <input id="txtPassword" class="form-control" placeholder="Password" name="password" type="password" value="">
                                            </div>                                            
                                            <a id="btnCrearCuenta" href="#crear-cuenta" class="btn btn-lg btn-green btn-block">Crear Cuenta</a>                                            
                                        </fieldset>
                                        
                                    </form>
                                </div>
                            </div>
                        </div>`;

        return estructura;                    
    }

    static getCabecera() {
        let siteHeader = `<header class="site-header">
                            <div class="site-logo clearfix">
                                <div>
                                    <a href="#">
                                        <img class="img-circle" src="http://3.bp.blogspot.com/-lc6m09MBc1s/T8fYrcdkZHI/AAAAAAAAACk/H10XCPJ_Xmc/s1600/chef%2Bsin%2Bfondo%2BPNG.png" >
                                    </a>
                                </div>
                                <div class="div-title">
                                     <h2>JS-Gourmet</h2>
                                </div>
                            </div>
                        </header>`;
        return siteHeader;
    }
    
    static getMenu() {
        let siteMenu = `<nav class="site-menu navbar navbar-default">
                            <div class="box-content clearfix container-fluid">
                                <ul class="home-menu nav navbar-nav">
                                    <li class="link"><a id="menuHome" href="#home"><i class="fa fa-home fa-fw"></i> Home</a></li>
                                    <li class="link"><a id="menuPage1" href="#page-1"><i class="fa fa-gear fa-fw"></i> Comidas</a></li>
                                    <li class="link"><a id="menuPage2" href="#page-2"><i class="fa fa-beer fa-fw"></i> Bebidas</a></li>
                                    <li class="link"><a id="menuPage3" href="#page-3"><i class="fa fa-user fa-fw"></i> Usuario</a></li>                                    
                                </ul>
                                <ul class="nav navbar-nav navbar-right">                                  
                                  <li><a id="logout" href="#logout" href="#"><span class="glyphicon glyphicon-log-in"></span> Log Out</a></li>
                                </ul>
                            </div>
                        </nav>`;
        return siteMenu;
    }

    static getPieDePagina() {
        let siteFooter = `<footer class="site-footer">
                            <div class="gec-sites"><span class="title">Ronal @Copyright 2017</span>
                                <ul>
                                    <li class="link"><a href="#">foot 1</a></li>
                                    <li class="link"><a href="#">foot 2</a></li>
                                </ul>
                            </div>
                        </footer>`;
        return siteFooter;
    }

    static getEstructuraPanel(stringReplace) {
        let estructura =  `<!-- /.row -->
                            <button type="button" id="btnCrear" class="btn btn-primary">Añadir</button>
                                <div class="col-lg-12">
                                    <div class="panel panel-default">
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

    static getEstructuraEditarUsuario() {
        let estructura =  `<!-- /.row -->
                                <div class="col-lg-6">
                                    <div class="panel panel-default">
                                        <div class="panel-heading">
                                            Perfil de Usuario
                                        </div>
                                        <!-- /.panel-heading -->
                                        <div class="panel-body">
                                            <form role="form">
                                                <div class="form-group">
                                                    <label>E-mail</label>
                                                    <input id="txtEmail" class="form-control" placeholder="E-mail">
                                                </div>
                                                <div class="form-group">
                                                    <label>Apellidos</label>
                                                    <input id="txtApellidos" class="form-control" placeholder="Apellidos">
                                                </div>
                                                <div class="form-group">
                                                    <label>Nombre</label>
                                                    <input id="txtNombre" class="form-control" placeholder="Nombre">
                                                </div>
                                                <div class="form-group">
                                                    <label>Username</label>
                                                    <input id="txtUsername" class="form-control" placeholder="Username">
                                                </div>
                                                <button id="btnGuardarUsuario" type="button" class="btn btn-success">Guardar</button>
                                                <button id="btnEliminarUsuario" type="button" class="btn btn-danger">Eliminar</button>
                                            </form>
                                        </div>
                                        <!-- /.panel-body -->
                                    </div>
                                    <!-- /.panel -->
                                </div>
                            
                            <!-- /.row --> `;
        return estructura;                    
    }

    static closeModal(){
        var modal = document.body.querySelector("#contenedorModal");
        if(modal){
            modal.parentElement.removeChild(modal);
        }
    }

    static openModal(textoMostrar, textoHeader, cssBtn) {
        let contenedorModal = document.createElement("div");
        contenedorModal.id = "contenedorModal";
        contenedorModal.innerHTML = `
            <div class="modal fade in" id="myModal" role="dialog" style="display: block; padding-left: 0px;">
            <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" id="close-modal-button">×</button>
            <h4 class="modal-title">${textoHeader}</h4>
            </div>
            <div class="modal-body">
                ${textoMostrar}
            </div>
            <div class="modal-footer">
                <button id="btnSuccessModal" type="button" class="btn btn-${cssBtn}" id="close-modal-button2">Aceptar</button>
                <button type="button" class="btn btn-default" id="close-modal-button2">Cancelar</button>
            </div>
            </div>

            </div>
            </div>
            <div class="modal-backdrop fade in"></div>
            `;

        let botonCerrar1 = contenedorModal.querySelector("#close-modal-button");
        botonCerrar1.addEventListener("click", () => this.closeModal());

        let botonCerrar2 = contenedorModal.querySelector("#close-modal-button2");
        botonCerrar2.addEventListener("click", () => this.closeModal());

        document.body.appendChild(contenedorModal);
    }

    static estructuraComida() {
        let estructura =  `<form role="form">
                                <div class="form-group">
                                    <label>Tipo</label>
                                    <input id="txtTipo" class="form-control" placeholder="Tipo">
                                </div>
                                <div class="form-group">
                                    <label>Precio</label>
                                    <input id="txtPrecio" class="form-control" placeholder="Precio">
                                </div>
                                <div class="form-group">
                                    <label>Calorias</label>
                                    <input id="txtCalorias" class="form-control" placeholder="Calorias">
                                </div>
                                <div class="form-group">
                                    <label>Existencias</label>
                                    <input id="txtExistencias" class="form-control" placeholder="Existencias">
                                </div>   
                                <div class="form-group">
                                    <label>Nombre</label>
                                    <input id="txtNombre" class="form-control" placeholder="Nombre">
                                </div>                              
                            </form>`;
        return estructura; 
    }

    static estructuraVerComida(comida) {
        let estructura =  `<form role="form">
                                <div class="form-group">
                                    <label>Tipo</label>
                                    <p class="form-control-static">${comida._tipo}</p>
                                </div>
                                <div class="form-group">
                                    <label>Precio</label>
                                    <p class="form-control-static">${comida._precio}</p>
                                </div>
                                <div class="form-group">
                                    <label>Calorias</label>
                                    <p class="form-control-static">${comida._calorias}</p>
                                </div>
                                <div class="form-group">
                                    <label>Existencias</label>
                                    <p class="form-control-static">${comida._existencias}</p>
                                </div>   
                                <div class="form-group">
                                    <label>Nombre</label>
                                    <p class="form-control-static">${comida._nombre}</p>
                                </div>                              
                            </form>`;
        return estructura; 
    }

    static estructuraEditarComida(comida) {
        let estructura =  `<form role="form">
                                <div class="form-group">
                                    <label>Tipo</label>
                                    <input id="txtTipo" class="form-control" placeholder="Tipo" value="${comida._tipo}">
                                </div>
                                <div class="form-group">
                                    <label>Precio</label>
                                    <input id="txtPrecio" class="form-control" placeholder="Precio" value="${comida._precio}">
                                </div>
                                <div class="form-group">
                                    <label>Calorias</label>
                                    <input id="txtCalorias" class="form-control" placeholder="Calorias" value="${comida._calorias}">
                                </div>
                                <div class="form-group">
                                    <label>Existencias</label>
                                    <input id="txtExistencias" class="form-control" placeholder="Existencias" value="${comida._existencias}">
                                </div>   
                                <div class="form-group">
                                    <label>Nombre</label>
                                    <input id="txtNombre" class="form-control" placeholder="Nombre" value="${comida._nombre}">
                                </div>                              
                            </form>`;
        return estructura; 
    }
}






