import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import HeaderAdmin from "../../../components/layouts/admin/header_admin";
import FooterAdmin from "../../../components/layouts/admin/footer_admin";

import History from "../../../src/History";

const url = window.$url_api;

class FormCambiarClave extends Component {

    constructor(props) {
      super(props);

      this.state = {
        _id: "",
        usuario: "",
        nueva_clave: "",
        clave_actual: ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      var url = window.$url_api;     

      var token = sessionStorage.getItem(window.$nombre_session);
      var url_check = url + "/acceso/validar";

      axios.post(url_check, {"token" : token})
      .then(res => {
        console.log(res);
        console.log(res.data);   
        this.setState({
            isLoaded: true,
            _id : res.data.token.id,
            usuario: res.data.token.usuario
        }); 
      }).catch(e => {
          console.log(e);
      });

    }

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
      e.preventDefault();

      var { _id, usuario, nueva_clave, clave_actual } = this.state;

      var url_acceso = window.$url_api + "/acceso";

      axios.post(url_acceso, {"nombre" : usuario, "clave" : clave_actual})
        .then(res => {
 
          if(res.data.token != null) {

            var url_cuenta = window.$url_api + "/cuenta/cambiarClave";

            axios.post(url_cuenta, {"id" : _id, "clave" : nueva_clave}, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
            .then(res2 => {

                if(res2.data.estado == 200) {
                    sessionStorage.setItem(window.$nombre_session, "");
                    sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "La clave fue cambiada correctamente", tipo : "success" }));   
                    History.push("/ingreso");      
                    History.go();

                } else {
                    sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrio un error cambiando la clave", tipo : "warning" }));   
                    History.push("/cambiarClave");      
                    History.go();
                }     
            }).catch(e2 => {
                console.log(e2);
            });

          } else {
            sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ingreso inválido", tipo : "warning" }));   
            History.push("/cambiarClave");      
            History.go();
          }     
      }).catch(e => {
          console.log(e);
      });

    }

    render() {

        const { _id, usuario, nueva_clave, clave_actual } = this.state;

        return (
          <div>
            <HeaderAdmin />
            <br/>
            <div className="container">
              <div className="card card-primary contenedor">
                  <div className="card-header bg-primary">Cambiar clave</div>
                  <div className="card-body">
                      <div className="card-block">
                          <form onSubmit={this.handleSubmit}>
                              <legend>Datos</legend>
                              <input type="hidden" name="_id" value={_id} onChange={this.handleChange} />
                              <div className="form-group">
                                <label>Usuario</label>
                                <input type="text" name="usuario" value={usuario} onChange={this.handleChange} className="form-control" readOnly />
                              </div>
                              <div className="form-group">
                                <label>Nueva clave</label>
                                <input type="password" name="nueva_clave" value={nueva_clave} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="form-group">
                                <label>Clave actual</label>
                                <input type="password" name="clave_actual" value={clave_actual} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="text-center mt-3">
                                <button type="submit" name="guardar" id="guardar" className="btn btn-primary boton-largo">Guardar</button>
                              </div>               
                          </form>
                      </div>
                  </div>
              </div>
            </div>
            <FooterAdmin />
          </div>
        );
    }
}
export default FormCambiarClave;