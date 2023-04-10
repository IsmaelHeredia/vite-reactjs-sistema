import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import HeaderAdmin from "../../layouts/admin/header_admin";
import FooterAdmin from "../../layouts/admin/footer_admin";

import History from "../../../src/History";

class FormAgregarProveedor extends Component {

    constructor(props) {
      super(props);

      this.state = {
        nombre: "",
        direccion: "",
        telefono: ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
      e.preventDefault();

      var { nombre, direccion, telefono } = this.state;

      var url = window.$url_api + "/proveedores";
      axios.post(url, 
        {"nombre" : nombre, "direccion" : direccion, "telefono" : telefono},
        {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
      .then(res => {
        var estado = res.data.estado;
        if(estado == 200) {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "El proveedor fue creado exitosamente", tipo : "success" }));   
          History.push("/proveedores");      
          History.go();
        } else {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error creando el proveedor", tipo : "danger" }));   
          History.push("/proveedores");      
          History.go();
        }
      }).catch(e => {
        sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error creando el proveedor", tipo : "danger" }));   
        History.push("/proveedores");      
        History.go();
      });

    }

    render() {

        const { nombre, direccion, telefono } = this.state;

        return (
          <div>
            <HeaderAdmin />
            <div className="container">
              <br/>
              <h3 align="center">Proveedores</h3>
              <br/>
              <div className="card card-primary contenedor">
                  <div className="card-header bg-primary">Agregar Proveedor</div>
                  <div className="card-body">
                      <div className="card-block">
                          <form onSubmit={this.handleSubmit}>
                              <legend>Datos</legend>
                              <div className="form-group">
                                <label>Nombre</label>
                                <input type="text" name="nombre" value={nombre} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="form-group">
                                <label>Dirección</label>
                                <input type="text" name="direccion" value={direccion} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="form-group">
                                <label>Teléfono</label>
                                <input type="text" name="telefono" value={telefono} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="text-center pt-4">
                                  <p className="lead">
                                    <button type="submit" name="guardar" id="guardar" className="btn btn-primary boton-largo">Guardar</button>
                                    <a href="/proveedores" className="btn btn-info boton-largo center-block">Atrás</a>
                                  </p>
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
export default FormAgregarProveedor;