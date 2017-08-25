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
                                    <form id="formCrearUsuario" accept-charset="UTF-8" role="form">
                                        <fieldset>
                                            <div class="form-group">
                                                <input id="txtUsername" class="form-control" placeholder="Username" name="username" type="text" required="true">
                                            </div>
                                            <div class="form-group">
                                                <input id="txtPassword" class="form-control" placeholder="Password" name="password" type="password" value="" >
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
                                    <form id="formCrearUsuario" accept-charset="UTF-8" role="form">
                                        <fieldset>
                                            <div class="form-group">
                                                <input id="txtEmail" class="form-control" placeholder="E-mail" name="email" type="email" autofocus required="true" alt="E-mail" minlength="4" maxlength="100">
                                            </div>
                                            <div class="form-group">
                                                <input id="txtApellidos" class="form-control" placeholder="Apellidos" name="apellidos" type="text" value="" required="true" alt="Apellidos" minlength="4" maxlength="100">
                                            </div>
                                            <div class="form-group">
                                                <input id="txtNombre" class="form-control" placeholder="Nombre" name="nombre" type="text" value="" required="true" alt="Nombre" minlength="4" maxlength="100">
                                            </div>
                                            <div class="form-group">
                                                <input id="txtUsername" class="form-control" placeholder="Username" name="username" type="text" value="" required="true" alt="Username" minlength="4" maxlength="100">
                                            </div>
                                            <div class="form-group">
                                                <input id="txtPassword" class="form-control" placeholder="Password" name="password" type="password" value="" required="true" alt="Password" minlength="4" maxlength="100">
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
                                        <img class="img-circle" src="./css/images/Triangles.svg" >
                                    </a>
                                </div>
                                <div class="div-title">
                                     <h2>JS-Gourmet</h2>
                                </div>
                            </div>
                        </header>`;
        return siteHeader;
    }
    
    static getMenu(cadenaMenu) {
        let siteMenu = `<nav class="site-menu navbar navbar-default">
                            <div class="box-content clearfix container-fluid">
                                <ul class="home-menu nav navbar-nav">
                                    ${cadenaMenu}                                    
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
                            <div>
                                <div class="btn-panel">
                                    <button type="button" id="btnCrear" class="btn btn-green">Añadir</button>
                                </div>
                                <div class="input-group custom-search-form">
                                    <input id="txtBuscar" type="text" class="form-control" placeholder="Search...">
                                    <span class="input-group-btn">
                                        <button id="btnBuscar" class="btn btn-default" type="button">
                                            <i class="fa fa-search"></i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                                <div class="col-lg-12">
                                    <div class="panel panel-success">
                                        <div class="panel-heading">
                                            $
                                        </div>
                                        <!-- /.panel-heading -->
                                        <div id="panelBody" class="panel-body">
                                            <div class="table-responsive table-bordered">
                                                <table id="tableResultados" class="table-users table table-hover ">
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
                                    <div class="panel panel-success">
                                        <div class="panel-heading">
                                            Perfil de Usuario
                                        </div>
                                        <!-- /.panel-heading -->
                                        <div class="panel-body">
                                            <form id="formEditarUsuario" role="form">
                                                <div class="form-group">
                                                    <label>E-mail</label>
                                                    <input id="txtEmail" class="form-control" placeholder="E-mail" required="true" alt="E-mail">
                                                </div>
                                                <div class="form-group">
                                                    <label>Apellidos</label>
                                                    <input id="txtApellidos" class="form-control" placeholder="Apellidos" required="true" alt="Apellidos">
                                                </div>
                                                <div class="form-group">
                                                    <label>Nombre</label>
                                                    <input id="txtNombre" class="form-control" placeholder="Nombre" required="true" alt="Nombre">
                                                </div>
                                                <div class="form-group">
                                                    <label>Username</label>
                                                    <input id="txtUsername" class="form-control" placeholder="Username" required="true" alt="Username">
                                                </div>
                                                <button id="btnGuardarUsuario" type="button" class="btn btn-green">Guardar</button>
                                                <button id="btnEliminarUsuario" type="button" class="btn btn-danger">Eliminar</button>
                                            </form>
                                        </div>
                                        <!-- /.panel-body -->
                                    </div>
                                    <!-- /.panel -->
                                </div>
                                <div class="col-lg-6">
                                    
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
        let estructura =  `<form id="formCrearComida" role="form" class="form-horizontal">
                                <div id="message" style="display:none;"></div>                                
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Tipo</label>                                    
                                    <div class="col-sm-10">
                                        <select id="cboTipo" class="form-control">
                                            <option value="Entrante">Entrante</option>
                                            <option value="Principal">Principal</option>
                                            <option value="Postre">Postre</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Precio</label>                                    
                                    <div class="col-sm-10">
                                        <input id="txtPrecio" class="form-control" placeholder="Precio" required="true" type="number" alt="Precio">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Calorias</label>
                                    <div class="col-sm-10">
                                        <input id="txtCalorias" class="form-control" placeholder="Calorias" required="true" alt="Calorias">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Existencias</label>
                                    <div class="col-sm-10">
                                        <input id="txtExistencias" class="form-control" placeholder="Existencias" type="number" required="true" alt="Existencias">
                                    </div>    
                                </div>   
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Nombre</label>
                                    <div class="col-sm-10">
                                        <input id="txtNombre" class="form-control" placeholder="Nombre" required="true" alt="Nombre">
                                    </div>    
                                </div>                              
                            </form>`;
        return estructura; 
    }

    static estructuraVerComida(comida) {
        let estructura =  `<form role="form" class="form-horizontal">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Tipo</label>
                                    <div class="col-sm-10">
                                        <p class="form-control-static">${comida._tipo}</p>
                                    </div> 
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Precio</label>
                                    <div class="col-sm-10">
                                        <p class="form-control-static">${comida._precio}</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Calorias</label>
                                    <div class="col-sm-10">
                                        <p class="form-control-static">${comida._calorias}</p>
                                    </div> 
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Existencias</label>
                                    <div class="col-sm-10">
                                        <p class="form-control-static">${comida._existencias}</p>
                                    </div>
                                </div>   
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Nombre</label>
                                    <div class="col-sm-10">
                                        <p class="form-control-static">${comida._nombre}</p>
                                    </div>
                                </div>                              
                            </form>`;
        return estructura; 
    }

    static estructuraVerComida_row(comida) {
        let estructura =  `<div style="float: left;">
                                <p>
                                    <strong>Nombre: </strong> <span>${comida._nombre}</span>
                                    <strong class="m-left">Existencias: </strong> <span>${comida._existencias}</span>
                                    <strong class="m-left">Calorias: </strong> <span>${comida._calorias}</span>
                                </p>
                                <p>
                                    <strong>Precio: </strong> <span>${comida._precio}</span>
                                    <strong class="m-left">Tipo: </strong> <span>${comida._tipo}</span>
                                </p>
                            </div>
                            <div style="text-align: right;">
                                <button id="close" type="button" class="btn btn-default btn-circle">
                                    <i class="fa fa-times"></i>
                                </button>
                            </div>`;
        return estructura; 
    }

    static estructuraEditarComida(comida) {
        let estructura =  `<form id="formEditarComida" role="form" class="form-horizontal">
                                <div id="message" style="display:none;"></div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Tipo</label>
                                    <div class="col-sm-10">                                    
                                        <select id="cboTipo" class="form-control" value="${comida._tipo}">
                                            <option value="Entrante">Entrante</option>
                                            <option value="Principal">Principal</option>
                                            <option value="Postre">Postre</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Precio</label>
                                    <div class="col-sm-10">
                                        <input id="txtPrecio" class="form-control" placeholder="Precio" value="${comida._precio}" required="true" alt="Precio">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Calorias</label>
                                    <div class="col-sm-10">
                                        <input id="txtCalorias" class="form-control" placeholder="Calorias" value="${comida._calorias}" required="true" alt="Calorias">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Existencias</label>
                                    <div class="col-sm-10">
                                        <input id="txtExistencias" class="form-control" placeholder="Existencias" value="${comida._existencias}" required="true" alt="Existencias">
                                    </div>
                                </div>   
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Nombre</label>
                                    <div class="col-sm-10">
                                        <input id="txtNombre" class="form-control" placeholder="Nombre" value="${comida._nombre}" required="true" alt="Nombre">
                                    </div>
                                </div>                              
                            </form>`;
        return estructura; 
    }

    static estructuraBebida() {
        let estructura =  `<form id="formCrearBebida" role="form" class="form-horizontal">
                                <div id="message" style="display:none;"></div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Nombre</label>
                                    <div class="col-sm-10">
                                        <input id="txtNombre" class="form-control" placeholder="Nombre" required="true" alt="Nombre">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Existencias</label>
                                    <div class="col-sm-10">
                                        <input id="txtExistencias" class="form-control" placeholder="Existencias" type="number" required="true" alt="Nombre">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Calorias</label>
                                    <div class="col-sm-10">
                                        <input id="txtCalorias" class="form-control" placeholder="Calorias" type="number" required="true" alt="Calorias">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Precio</label>
                                    <div class="col-sm-10">
                                        <input id="txtPrecio" class="form-control" placeholder="Precio" type="number" required="true" alt="Precio">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Es alcohólica?</label>
                                    <div class="col-sm-10">
                                        <select id="cboEsAlcoholica" class="form-control">
                                            <option value="1">SI</option>
                                            <option value="0">NO</option>
                                        </select>
                                    </div>
                                </div>   
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Grados</label>
                                    <div class="col-sm-10">
                                        <input id="txtGrados" class="form-control" placeholder="Grados" type="number" required="true" alt="Calorias">
                                    </div>
                                </div>                              
                            </form>`;
        return estructura; 
    }

    static estructuraVerBebida(bebida) {
        let estructura =  `<form role="form" class="form-horizontal">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Nombre</label>
                                    <div class="col-sm-10">
                                        <p class="form-control-static">${bebida._nombre}</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Existencias</label>
                                    <div class="col-sm-10">
                                        <p class="form-control-static">${bebida._existencias}</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Calorias</label>
                                    <div class="col-sm-10">
                                        <p class="form-control-static">${bebida._calorias}</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Precio</label>
                                    <div class="col-sm-10">
                                        <p class="form-control-static">${bebida._precio}</p>
                                    </div>
                                </div>   
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Es alcoholica?</label>
                                    <div class="col-sm-10">
                                        <p class="form-control-static">${bebida._esAlcoholica ? 'SI' : 'NO'}</p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Grados</label>
                                    <div class="col-sm-10">
                                        <p class="form-control-static">${bebida._grados}</p>
                                    </div>
                                </div>                              
                            </form>`;
        return estructura; 
    }

    static estructuraVerBebida_row(bebida) {
        let estructura =  `<div style="float: left;">
                                <p>
                                    <strong>Nombre: </strong> <span>${bebida._nombre}</span>
                                    <strong class="m-left">Existencias: </strong> <span>${bebida._existencias}</span>
                                    <strong class="m-left">Calorias: </strong> <span>${bebida._calorias}</span>
                                </p>
                                <p>
                                    <strong>Precio: </strong> <span>${bebida._precio}</span>
                                    <strong class="m-left">Grados: </strong> <span>${bebida._grados}</span>
                                    <strong class="m-left">Es Alcolica: </strong> <span>${bebida._esAlcoholica}</span>
                                </p>
                            </div>
                            <div style="text-align: right;">
                                <button id="close" type="button" class="btn btn-default btn-circle">
                                    <i class="fa fa-times"></i>
                                </button>
                            </div>`;
        return estructura; 
    }

    static estructuraEditarBebida(bebida) {
        let estructura =  `<form id="formEditarBebida" role="form" class="form-horizontal">
                                <div id="message" style="display:none;"></div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Nombre</label>
                                    <div class="col-sm-10">
                                        <input id="txtNombre" class="form-control" placeholder="Nombre" value="${bebida._nombre}" required="true" alt="Nombre">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Existencias</label>
                                    <div class="col-sm-10">
                                        <input id="txtExistencias" class="form-control" placeholder="Existencias" value="${bebida._existencias}" type="number" required="true" alt="Existencias">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Calorias</label>
                                    <div class="col-sm-10">
                                        <input id="txtCalorias" class="form-control" placeholder="Calorias" value="${bebida._calorias}" type="number" required="true" alt="Calorias">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Precio</label>
                                    <div class="col-sm-10">
                                        <input id="txtPrecio" class="form-control" placeholder="Precio" value="${bebida._precio}" type="number" required="true" alt="Precio">
                                    </div>
                                </div>
                                <div class="form-group" value="${bebida._esAlcoholica ? 1 : 0}">
                                    <label class="col-sm-2 control-label">Es alcohólica?</label>
                                    <div class="col-sm-10">
                                        <select id="cboEsAlcoholica" class="form-control">
                                            <option value="1">SI</option>
                                            <option value="0">NO</option>
                                        </select>
                                    </div>
                                </div>   
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">Grados</label>
                                    <div class="col-sm-10">
                                        <input id="txtGrados" class="form-control" placeholder="Grados" value="${bebida._grados}" type="number" required="true" alt="Grados">
                                    </div>
                                </div>                              
                            </form>`;
        return estructura; 
    }

    static getEstructuraGraficosComida() {
        let estructura =  `<!-- /.row -->                           
                                <div class="col-lg-6">
                                    <div class="panel panel-success">
                                        <div class="panel-heading">
                                            Porcentaje de existencias por Comida
                                        </div>
                                        <!-- /.panel-heading -->
                                        <div class="panel-body">
                                            <div id="existencias">No se encontró información.</div>
                                        </div>
                                        <!-- /.panel-body -->
                                    </div>
                                    <!-- /.panel -->
                                </div>
                                <div class="col-lg-6">
                                    <div class="panel panel-success">
                                        <div class="panel-heading">
                                            Cantidad de calorias por Comida
                                        </div>
                                        <!-- /.panel-heading -->
                                        <div class="panel-body">
                                            <div id="calorias">No se encontró información.</div>
                                        </div>
                                        <!-- /.panel-body -->
                                    </div>
                                    <!-- /.panel -->
                                </div>
                            
                            <!-- /.row --> `;

        return estructura;                    
    }

    static getEstructuraGraficosBebida() {
        let estructura =  `<!-- /.row -->                           
                                <div class="col-lg-6">
                                    <div class="panel panel-success">
                                        <div class="panel-heading">
                                            Cantidad de bebidas alcoholicas y No alcoholicas
                                        </div>
                                        <!-- /.panel-heading -->
                                        <div class="panel-body">
                                            <div id="alcoholicas">No se encontró información.</div>
                                        </div>
                                        <!-- /.panel-body -->
                                    </div>
                                    <!-- /.panel -->
                                </div>
                                <div class="col-lg-6">
                                    <div class="panel panel-success">
                                        <div class="panel-heading">
                                            Cantidad de grados por Bebida
                                        </div>
                                        <!-- /.panel-heading -->
                                        <div class="panel-body">
                                            <div id="grados">No se encontró información.</div>
                                        </div>
                                        <!-- /.panel-body -->
                                    </div>
                                    <!-- /.panel -->
                                </div>
                            
                            <!-- /.row --> `;

        return estructura;                    
    }

    static openBlock() {
        let contenedorModal = document.createElement("div");
        contenedorModal.id = "contenedorBlock";
        contenedorModal.innerHTML = `
                        <div class="blockUI blockOverlay" style="z-index: 1000; border: none; margin: 0px; padding: 0px; width: 100%; height: 100%; top: 0px; left: 0px; background-color: rgb(0, 0, 0); opacity: 0.6; cursor: wait; position: fixed;">
       
                       </div>

                       <div class="blockUI blockMsg blockPage" style="z-index: 1011; position: fixed; padding: 15px; margin: 0px; width: 30%; top: 40%; left: 35%; text-align: center; color: rgb(255, 255, 255); border: none; cursor: wait; border-radius: 10px; opacity: 0.5;">
                            <img src="./css/images/Ellipsis.svg"></img>
                       </div>`;

        document.body.appendChild(contenedorModal);
    }

    static closeBlock(){
        var modal = document.body.querySelector("#contenedorBlock");
        if(modal){
            modal.parentElement.removeChild(modal);
        }
    }

    static mensajeSuccess(mensaje) {
        let mensajeFlotante = document.createElement("div");
        mensajeFlotante.id = "mensajeFlotante";
        mensajeFlotante.className = "alert alert-success mensaje-flotante fade-in";
        mensajeFlotante.innerHTML =  mensaje;
        
        document.body.appendChild(mensajeFlotante);

        setTimeout(() => {
            document.body.removeChild(mensajeFlotante);
        },4000);
    }

    static mensajeWarning(mensaje) {
        let mensajeFlotante = document.createElement("div");
        mensajeFlotante.id = "mensajeFlotante";
        mensajeFlotante.className = "alert alert-warning mensaje-flotante fade-in";
        mensajeFlotante.innerHTML =  mensaje;
        
        document.body.appendChild(mensajeFlotante);

        setTimeout(() => {
            document.body.removeChild(mensajeFlotante);
        },4000);
    }

    static mensajeError(mensaje) {
        let mensajeFlotante = document.createElement("div");
        mensajeFlotante.id = "mensajeFlotante";
        mensajeFlotante.className = "alert alert-danger mensaje-flotante fade-in";
        mensajeFlotante.innerHTML =  mensaje;
        
        document.body.appendChild(mensajeFlotante);

        setTimeout(() => {
            document.body.removeChild(mensajeFlotante);
        },4000);
    }

    static mensajeErrorPopup(mensaje) {
        let mensajeFlotante = document.createElement("div");
        mensajeFlotante.id = "mensajeFlotante";
        mensajeFlotante.className = "alert alert-danger fade-in";
        mensajeFlotante.innerHTML =  mensaje;
        
        let divMessage = document.body.querySelector("#message");
        divMessage.setAttribute("style","display: block");
        divMessage.appendChild(mensajeFlotante);

        setTimeout(() => {
            divMessage.removeChild(mensajeFlotante);
            divMessage.setAttribute("style","display: none");
        },4000);
    }

    static estructuraLogOut() {
        let estructura =  `<center>
                                 <img class="img-circle" src="http://www.legobatman.com/assets/media/global/header/batwink-loop.gif" >
                            </center>`;

        return estructura;                    
    }
}






