class GestorPageHtml {
    constructor() {

    }

    static getEstructuraLogin() {
        let estructura =  `<div class="col-md-4 col-md-offset-4">
                            <div class="login-panel panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title">Ingresar</h3>
                                </div>
                                <div class="panel-body">
                                    <form role="form">
                                        <fieldset>
                                            <div class="form-group">
                                                <input id="txtUsuario" class="form-control" placeholder="E-mail" name="email" type="email" autofocus>
                                            </div>
                                            <div class="form-group">
                                                <input id="txtPassword" class="form-control" placeholder="Password" name="password" type="password" value="">
                                            </div>
                                            <div class="checkbox">
                                                <label>
                                                    <input id="chkRecordar" name="remember" type="checkbox" value="Remember Me">Recordar
                                                </label>
                                            </div>
                                            <!-- Change this to a button or input when using this as a form -->
                                            <a id="btnLogin" href="#login" class="btn btn-lg btn-primary btn-block">Login</a>
                                            <a id="btnCrearCuenta" href="#crear-cuenta" class="btn btn-lg btn-default btn-block">Sign in</a>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>`;

        return estructura;                    
    }

    static getEstructuraCrearUsuario() {
        let estructura =  `<div class="col-md-4 col-md-offset-4">
                            <div class="login-panel panel panel-default">
                                <div class="panel-heading">
                                    <h3 class="panel-title">Crear nueva cuenta</h3>
                                </div>
                                <div class="panel-body">
                                    <form role="form">
                                        <fieldset>
                                            <div class="form-group">
                                                <input class="form-control" placeholder="E-mail" name="email" type="email" autofocus>
                                            </div>
                                            <div class="form-group">
                                                <input class="form-control" placeholder="Apellidos" name="apellidos" type="text" value="">
                                            </div>
                                            <div class="form-group">
                                                <input class="form-control" placeholder="Nombre" name="nombre" type="text" value="">
                                            </div>
                                            <div class="form-group">
                                                <input class="form-control" placeholder="Username" name="username" type="text" value="">
                                            </div>
                                            <div class="form-group">
                                                <input class="form-control" placeholder="Password" name="password" type="password" value="">
                                            </div>
                                            <!-- Change this to a button or input when using this as a form -->
                                            <a id="btnCrearCuenta" href="#crear-cuenta" class="btn btn-lg btn-primary btn-block">Crear Cuenta</a>
                                            <a id="btnCancelar" href="#cancelar" class="btn btn-lg btn-default btn-block">Cancelar</a>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>`;

        return estructura;                    
    }

    static getCabecera() {
        let siteHeader = `<header class="site-header">
                            <div class="site-logo clearfix"><a href="#"><img src="https://www.visualstudio.com/wp-content/uploads/2016/10/VS-IDE-Javascript-hero_636x350.png" width="200px" heigth="100px"></a></div>
                        </header>`;
        return siteHeader;
    }
    
    static getMenu() {
        let siteMenu = `<nav class="site-menu">
                            <div class="box-content clearfix">
                                <ul class="home-menu">
                                    <li class="link"><a id="menuHome" href="#home">Home</a></li>
                                    <li class="link"><a id="menuPage1" href="#page-1">Page 1</a></li>
                                    <li class="link"><a id="menuPage2" href="#page-2">Page 2</a></li>
                                    <li class="link"><a id="menuPage3" href="#page-3">Page 3</a></li>
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
}





