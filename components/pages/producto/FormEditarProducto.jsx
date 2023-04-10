import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import HeaderAdmin from "../../layouts/admin/header_admin";
import FooterAdmin from "../../layouts/admin/footer_admin";

import History from "../../../src/History";

class FormEditarProducto extends Component {

    constructor(props) {
      super(props);

      this.state = {
        proveedores: [],
        _id : "",
        nombre: "",
        descripcion : "",
        precio : "",
        id_proveedor : "",
        proveedor: ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

      var history_url = History.location.pathname;
      var id_producto = history_url.split("productos/").pop().split("/editar").shift();
      var url_api_producto = window.$url_api + "/productos/" + id_producto;

      var proveedor_cargado = "";

      axios.get(url_api_producto, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.setState({
            isLoaded: true,
            _id : res.data.producto._id,
            nombre: res.data.producto.nombre,
            descripcion: res.data.producto.descripcion,
            precio : res.data.producto.precio,
            proveedor : res.data.producto.proveedor
          });       
          proveedor_cargado = res.data.producto.proveedor;   
      }).catch(e => {
          console.log(e);
      });

      var url_api_proveedor = window.$url_api + "/proveedores";
      axios.get(url_api_proveedor, {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
        .then(res => {
          console.log(res);
          console.log(res.data);
          var id_proveedor_encontrado = 0;
          res.data.proveedores.forEach( function(valor, indice, array) {
            if(valor.nombre == proveedor_cargado) {
              id_proveedor_encontrado = valor._id;
            }
          });        
          this.setState({
            isLoaded: true,
            proveedores: res.data.proveedores,
            id_proveedor: id_proveedor_encontrado
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
        id_proveedor: event.target.value,
        proveedor: event.target.options[event.target.selectedIndex].text
      })
    }

    handleSubmit = (e) => {
      e.preventDefault();

      var { _id, nombre, descripcion, precio, id_proveedor, proveedor } = this.state;

      var url = window.$url_api + "/productos/" + _id;
      axios.put(url, 
        {"nombre" : nombre, "descripcion" : descripcion, "precio" : precio, "proveedor" : proveedor},
        {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
      .then(res => {
        var estado = res.data.estado;
        if(estado == 200) {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "El producto fue editado exitosamente", tipo : "success" }));   
          History.push("/productos");      
          History.go();
        } else {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error editando el producto", tipo : "danger" }));   
          History.push("/productos");      
          History.go();
        }
      }).catch(e => {
        sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error editando el producto", tipo : "danger" }));   
        History.push("/productos");      
        History.go();
      });

    }

    render() {

        const { proveedores, id, nombre, descripcion, precio, id_proveedor } = this.state;

        return (
          <div>
            <HeaderAdmin />
            <div className="container">
              <br/>
              <h3 align="center">Productos</h3>
              <br/>
              <div className="card card-primary contenedor">
                  <div className="card-header bg-primary">Editando el producto {nombre}</div>
                  <div className="card-body">
                      <div className="card-block">
                          <form onSubmit={this.handleSubmit}>
                              <input type="hidden" name="id" value={id} onChange={this.handleChange} />
                              <legend>Datos</legend>
                              <div className="form-group">
                                <label>Nombre</label>
                                <input type="text" name="nombre" value={nombre} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="form-group">
                                <label>Descripción</label>
                                <textarea name="descripcion" value={descripcion} onChange={this.handleChange} className="form-control" rows="3" required />
                              </div>
                              <div className="form-group">
                                <label>Precio</label>
                                <input type="text" name="precio" value={precio} onChange={this.handleChange} className="form-control" required />
                              </div>
                              <div className="form-group">
                                <label>Proveedor</label>
                                <select name="id_proveedor" value={id_proveedor} onChange={this.handleSelectChange} className="form-control" required>
                                  {proveedores.length && proveedores.map((item, index) => (
                                       <option key={item._id} value={item._id}>{item.nombre}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="text-center pt-4">
                                  <p className="lead">
                                    <button type="submit" name="guardar" id="guardar" className="btn btn-primary boton-largo">Guardar</button>
                                    <a href="/productos" className="btn btn-info boton-largo center-block">Atrás</a>
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
export default FormEditarProducto;