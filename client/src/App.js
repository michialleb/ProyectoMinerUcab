import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Sesion from "./pages/Sesion";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { Route, Switch } from "react-router-dom";
import Nosotros from "./pages/Nosotros";

// pagina de react-router-dom and netlify https://www.slightedgecoder.com/2018/12/18/page-not-found-on-netlify-with-react-router/
//  pagina de documentacion de react-router-dom https://reacttraining.com/react-router/web/guides/quick-start
// lo importe en el index.js
function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/nosotros/" component={Nosotros} />
        <Route exact path="/login/" component={Login} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
