import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {Navbar, Nav, Button, Form, FormControl} from 'react-bootstrap';

import Dashboard from "./components/dashboard";
import CurrentWeather from "./components/current-weather";
import CitySearch from './components/search-component';


class App extends Component {
  render() {
    return (
      <Router>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Jitterate</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Current</Nav.Link>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            </Nav>
          </Navbar>
          <Route path="/" exact component={CurrentWeather} />
          <Route path="/dashboard" component={Dashboard}/>
      </Router>
    );
  }
}

export default App;
