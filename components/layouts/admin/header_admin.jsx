import React, { Component } from "react";
import axios from "axios";

import History from "../../../src/History";

import Mensajes from "../mensajes/Mensajes";

class HeaderAdmin extends Component {

    constructor(props) {
      super(props);

      this.state = {
        usuario_logeado : "",
      };
    }

    componentDidMount() {

      var url = window.$url_api + "/acceso/validar";

      axios.post(url, {"token" : sessionStorage.getItem(window.$nombre_session)})
        .then(res => {
          this.setState({
            usuario_logeado: res.data.token.usuario,
          });          
      }).catch(e => {
          console.log(e);
      });

    }

    handleCerrarSesion = (e) => {
      e.preventDefault();
      sessionStorage.setItem(window.$nombre_session, "");
      sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Sesion cerrada", tipo : "success" }));   
      History.push("/ingreso");      
      History.go();
    }

    render() {

        const { usuario_logeado } = this.state;

        return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand text-center" href="#">Sistema</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor01">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/">Inicio <span className="sr-only"></span></a>
                </li>
                <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" id="themes">Administrar <span className="caret"></span></a>
                      <div className="dropdown-menu" aria-labelledby="categorias">
                        <a className="dropdown-item" href="/productos">Productos</a>
                        <a className="dropdown-item" href="/proveedores">Proveedores</a>
                        <a className="dropdown-item" href="/usuarios">Usuarios</a>
                      </div>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="cuenta" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{ usuario_logeado } <span className="caret"></span></a>
                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cuenta">
                        <a className="dropdown-item" href="/cambiarUsuario" name="cambiar_usuario">Cambiar Usuario</a>
                        <a className="dropdown-item" href="/cambiarClave" name="cambiar_clave">Cambiar Clave</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" onClick={this.handleCerrarSesion}>Salir</a>
                    </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Mensajes />
      </div>
        );
    }
}
export default HeaderAdmin;