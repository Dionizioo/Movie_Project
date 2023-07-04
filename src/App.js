import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import NewProject from './components/pages/Newproject';

import Conteiner from "./components/layout/Container";

function App() {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/company">Company</Link>
        <Link to="/NewProject">NewProject</Link>
      </div>
      <Switch>
      <Conteiner customClass ="min-height">
        <Route exact path="/" component={Home} />
        <Route exact path="/company" component={Company} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/newproject" component={NewProject} />
        </Conteiner>
      </Switch>
      <p>Footer</p>
    </Router>
  );
}

export default App;
