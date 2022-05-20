import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddSaveTheDate from "./components/add-savethedate.component";
import SaveTheDate from "./components/savethedate.component";
import SaveTheDatesList from "./components/savethedates-list.component";
import FlipBook from "./components/flipbook.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/flipbook"} className="navbar-brand">
            Home
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/flipbook"} className="nav-link">
                Album
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/savethedates"} className="nav-link">
                Messages
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/flipbook"]} component={FlipBook} />
            <Route exact path={["/savethedates"]} component={SaveTheDatesList} />
            <Route exact path="/add" component={AddSaveTheDate} />
            <Route path="/savethedates/:id" component={SaveTheDate} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
