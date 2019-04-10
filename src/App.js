import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {Navbar, Nav, Button, Form, FormControl} from 'react-bootstrap';

import CreateTodo from "./components/create-todo.component";
import FiveDay from "./components/five-day-forecast";
import CurrentWeather from "./components/current-weather";
import CitySearch from './components/search-component';

import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Jitterate</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Current</Nav.Link>
              <Nav.Link href="/edit">5 Day</Nav.Link>
            </Nav>
            <CitySearch></CitySearch>
          </Navbar>
          <Route path="/" exact component={CurrentWeather} />
          <Route path="/edit" component={FiveDay}/>
      </Router>
    );
  }
}

export default App;
