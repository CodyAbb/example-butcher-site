import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import CreateOrder from "./components/CreateOrder";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/example-butcher-site" component={Home} />
          <Route path="/example-butcher-site/about" component={About} />
          <Route
            path="/example-butcher-site/createorder"
            component={CreateOrder}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
