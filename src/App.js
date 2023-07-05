import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Newproject from './components/pages/Newproject'
import Projeto from "./components/pages/Projeto";

import Container from "./components/layout/Container";
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"




function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
      <Container customClass ="min-height">
        <Route exact path="/" component={Home} />
        <Route exact path="/company" component={Company} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/projeto" component={Projeto} />
        <Route exact path="/newProject" component={Newproject} />
        </Container>
      </Switch>
      <Footer/>
    </Router>
  );
}

export default App;
