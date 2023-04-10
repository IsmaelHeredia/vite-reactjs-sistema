import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import HeaderAdmin from "../../layouts/admin/header_admin";
import FooterAdmin from "../../layouts/admin/footer_admin";

import History from "../../../src/History";

class FormAgregarProducto extends Component {

    constructor(props) {
      super(props);

      this.state = {
        proveedores: [],
        nombre: "",
        descripcion: "",
        precio: "",
        id_proveedor: "",
        proveedor : ""
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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

      var { nombre, descripcion, precio, id_proveedor, proveedor } = this.state;

      var url = window.$url_api + "/productos";
      axios.post(url, 
        {"nombre" : nombre, "descripcion" : descripcion, "precio" : precio, "proveedor" : proveedor},
        {headers: { Authorization: `Bearer ${sessionStorage.getItem(window.$nombre_session)}` }})
      .then(res => {
        var estado = res.data.estado;
        if(estado == 200) {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "El producto fue creado exitosamente", tipo : "success" }));   
          History.push("/productos");      
          History.go();
        } else {
          sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error creando el producto", tipo : "danger" }));   
          History.push("/productos");      
          History.go();
        }
      }).catch(e => {
        sessionStorage.setItem(window.$nombre_session_mensaje, JSON.stringify({ texto : "Ocurrió un error creando el producto", tipo : "danger" }));   
        History.push("/productos");      
        History.go();
      });

    }

    render() {

        const { proveedores, nombre, descripcion, precio, id_proveedor, proveedor } = this.state;

        return (
          <div>
            <HeaderAdmin />
            <div className="container">
              <br/>
              <h3 align="center">Productos</h3>
              <br/>
              <div className="card card-primary contenedor">
                  <div className="card-header bg-primary">Agregar Producto</div>
                  <div className="card-body">
                      <div className="card-block">
                          <form onSubmit={this.handleSubmit}>
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
                                  <option value="" disabled>Seleccione un proveedor</option>
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
export default FormAgregarProducto;