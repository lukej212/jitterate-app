import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";

import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="http://www.lukeejohnson.com" target="_blank" rel="noopener noreferrer">
              <img src={logo} width="30" height="30" alt="lukeejohnson.com"/>
            </a>
            <Link to="/" className="navbar-brand">Jitterate Weather</Link>
            <div className="nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Daily</Link>
                </li>
                {/* <li className="navbar-item">
                  <Link to="/create" className="nav-link">5 Day</Link>
                </li> */}
                <li className="navbar-item">
                  <Link to="/edit" className="nav-link">5 Day</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Route path="/" exact component={TodosList} />
          <Route path="/edit" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />
        </div>
      </Router>
    );
  }
}

export default App;
