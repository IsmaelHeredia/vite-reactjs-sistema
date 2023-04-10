import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import HeaderAdmin from "../../layouts/admin/header_admin";
import FooterAdmin from "../../layouts/admin/footer_admin";

import Mensajes from "../../layouts/mensajes/Mensajes";

export default class ListarProveedor extends Component {

    constructor(props){
      super(props);
      this.state = {
        proveedores: [],
        isLoaded: false,
      }
    }

    componentDidMount() {
      var url = window.$url_api + "/proveedores";
      axios.get(url, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({
            isLoaded: true,
            proveedores: res.data.proveedores
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
              <h3 align="center">Lista de proveedores</h3>
              <br/>
              <table className="table table-bordered order-table ">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Direccion</th>
                    <th>Telefono</th>
                    <th>Fecha registro</th>
                    <th>Opción</th>
                  </tr>
                </thead>
                <tbody id="bodytable">
                    {this.renderList()}
                </tbody>
              </table>
              <div className="doble-espacio" />
              <div align="center">
                <a href="/proveedores/agregar" className="btn btn-primary boton-largo" role="button">Crear nuevo proveedor</a>
              </div>
            </div>
            <FooterAdmin />
          </div>
        );
    }

    renderList(){
      var { proveedores = [] } = this.props;
      var { isLoaded } = this.state;
      if (!isLoaded) {
        return (
            <tr><td>Cargando...</td></tr>
          )

      } else {

        return this.state.proveedores.map((proveedor)=>{

          return(
            <tr key={proveedor._id}>
              <td>{proveedor.nombre}</td>
              <td>{proveedor.direccion}</td>
              <td>{proveedor.telefono}</td>
              <td>{proveedor.fecha_registro}</td>
              <td>
                <a href={"/proveedores/" + proveedor._id + "/editar"} className="btn btn-info" role="button">Editar</a>
                <a href={"/proveedores/" + proveedor._id + "/borrar"} className="btn btn-danger" role="button">Borrar</a>
              </td>
            </tr>
          )

        })
      }

    }

}