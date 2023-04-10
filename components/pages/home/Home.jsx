import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import HeaderAdmin from "../../layouts/admin/header_admin";
import FooterAdmin from "../../layouts/admin/footer_admin";

import Mensajes from "../../layouts/mensajes/Mensajes";

class Home extends Component {

    render() {

        return (
          <div>
            <HeaderAdmin />
            <br />
            <h3 align="center">Bienvenido</h3>
            <FooterAdmin />
          </div>
        );
    }
}

export default Home;