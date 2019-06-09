import React from "react";
import "./App.css";
import "./Login.css";
import "./styles/Menu.css";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Sesion from "./pages/Sesion";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { Route, Switch } from "react-router-dom";
import Rooms from "./pages/Proxima";

import { isLogicalExpression } from "@babel/types";

// pagina de react-router-dom and netlify https://www.slightedgecoder.com/2018/12/18/page-not-found-on-netlify-with-react-router/
//  pagina de documentacion de react-router-dom https://reacttraining.com/react-router/web/guides/quick-start
// lo importe en el index.js
function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login/" component={Login} />
        <Route exact path="/proxima/" component={Rooms} />
        <Route exact path="/sesion" component={Sesion} />
        <Route component={Error} />
      </Switch>
    </>
  );
}

export default App;
