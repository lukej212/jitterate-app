import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {Navbar, Nav, Button, Form, FormControl} from 'react-bootstrap';

import CurrentWeather from "./components/current-weather";
import Forecast from "./components/forecast";

class App extends Component {
  render() {
    return (
      <Router>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Jitterate</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Current</Nav.Link>
              <Nav.Link href="/forecast">Forecast</Nav.Link>
            </Nav>
          </Navbar>
          <Route path="/" exact component={CurrentWeather} />
          <Route path="/forecast" component={Forecast}/>
      </Router>
    );
  }
}

export default App;
