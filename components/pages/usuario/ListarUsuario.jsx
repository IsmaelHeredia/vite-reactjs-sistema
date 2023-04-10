import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import HeaderAdmin from "../../layouts/admin/header_admin";
import FooterAdmin from "../../layouts/admin/footer_admin";

import Mensajes from "../../layouts/mensajes/Mensajes";

const url = window.$url_api;

export default class ListarUsuario extends Component {

    constructor(props){
      super(props);
      this.state = {
        usuarios: [],
        isLoaded: false,
      }
    }

    componentDidMount() {
      var url = window.$url_api + "/usuarios";
      axios.get(url, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({
            isLoaded: true,
            usuarios: res.data.usuarios
          });          
      }).catch(e => {
          console.log(e);
      });

    }

    render() {
        return (
          <div>
            <HeaderAdmin />
            <br/>
            <div className="container">
              <h3 align="center">Lista de usuarios</h3>
              <br/>
              <table className="table table-bordered order-table ">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Fecha registro</th>
                    <th>Opción</th>
                  </tr>
                </thead>
                <tbody id="bodytable">
                    {this.renderList()}
                </tbody>
              </table>
              <div className="doble-espacio"></div>
              <div align="center">
                <a href="/usuarios/agregar" className="btn btn-primary boton-largo" role="button">Crear nuevo usuario</a>
              </div>
            </div>
            <FooterAdmin />
          </div>
        );
    }

    renderList(){
      var { usuarios = [] } = this.props;
      var { isLoaded } = this.state;
      if (!isLoaded) {
        return (
            <tr><td>Cargando...</td></tr>
          )

      } else {

        return this.state.usuarios.map((usuario)=>{

          return(
            <tr key={usuario._id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.tipo}</td>
              <td>{usuario.fecha_registro}</td>
              <td>
                <a href={"/usuarios/" + usuario._id + "/editar"} className="btn btn-info" role="button">Editar</a>
                <a href={"/usuarios/" + usuario._id + "/borrar"} className="btn btn-danger" role="button">Borrar</a>
              </td>
            </tr>
          )

        })
      }

    }

}