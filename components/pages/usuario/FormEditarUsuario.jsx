import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import HeaderAdmin from "../../layouts/admin/header_admin";
import FooterAdmin from "../../layouts/admin/footer_admin";

import History from "../../../src/History";

class FormEditarUsuario extends Component {

    constructor(props) {
      super(props);

      this.state = {
        tipos_usuarios: [],
        _id : "",
        nombre: "",
        tipo: "",
        id_tipo : ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

        var history_url = History.location.pathname;
        var id_usuario = history_url.split("usuarios/").pop().split("/editar").shift();
        var url_api_usuario = window.$url_api + "/usuarios/" + id_usuario;
  
        var tipousuario_cargado = "";

        axios.get(url_api_usuario, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({
            isLoaded: true,
            _id : res.data.usuario._id,
            nombre: res.data.usuario.nombre,
            tipo : res.data.usuario.tipo
          });       
          tipousuario_cargado = res.data.usuario.tipo;   
      }).catch(e => {
          console.log(e);
      });

      var url_api_tiposusuarios = window.$url_api + "/tiposusuarios";
      axios.get(url_api_tiposusuarios, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          console.log(res);
          console.log(res.data);
          var id_tipousuario_encontrado = 0;
          res.data.tiposusuarios.forEach( function(valor, indice, array) {
            if(valor.nombre == tipousuario_cargado) {
              id_tipousuario_encontrado = valor._id;
            }
          });        
          this.setState({
            isLoaded: true,
            tipos_usuarios: res.data.tiposusuarios,
            id_tipo: id_tipousuario_encontrado
          });  
      }).catch(e => {
          console.log(e);
      });

    }

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleSelectChange = (event) => {
      this.setState({
        id_tipo: event.target.value,
        tipo: event.target.options[event.target.selectedIndex].text
      })
    }

    handleSubmit = (e) => {
      e.preventDefault();

      var { _id, nombre, id_tipo, tipo } = this.state;

      var url = window.$url_api + "/usuarios/" + _id;
      axios.put(url, 
        {"nombre" : nombre, "tipo" : tipo},
        {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
      .then(res => {
        var estado = res.data.estado;
        if(estado == 200) {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "El usuario fue creado exitosamente", tipo : "success" }));   
          History.push("/usuarios");      
          History.go();
        } else {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error creando el usuario", tipo : "danger" }));   
          History.push("/usuarios");      
          History.go();
        }
      }).catch(e => {
        sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error creando el usuario", tipo : "danger" }));   
        History.push("/usuarios");      
        History.go();
      });

    }

    render() {

        const { tipos_usuarios, nombre, clave, id_tipo, tipo } = this.state;

        return (
          <div>
            <HeaderAdmin />
            <div className="container">
              <br/>
              <h3 align="center">Usuarios</h3>
              <br/>
              <div className="card card-primary contenedor">
                  <div className="card-header bg-primary">Agregar Usuario</div>
                  <div className="card-body">
                      <div className="card-block">
                          <form onSubmit={this.handleSubmit}>
                              <legend>Datos</legend>
                              <div className="form-group">
                                <label>Nombre</label>
                                <input type="text" name="nombre" value={nombre} onChange={this.handleChange} className="form-control" readOnly />
                              </div>
                              <div className="form-group">
                                <label>Tipo</label>
                                <select name="id_tipo" value={id_tipo} onChange={this.handleSelectChange} className="form-control" required>
                                  {tipos_usuarios.length && tipos_usuarios.map((item, index) => (
                                       <option key={item._id} value={item._id}>{item.nombre}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="text-center pt-4">
                                  <p className="lead">
                                    <button type="submit" name="guardar" id="guardar" className="btn btn-primary boton-largo">Guardar</button>
                                    <a href="/usuarios" className="btn btn-info boton-largo center-block">Atrás</a>
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
export default FormEditarUsuario;