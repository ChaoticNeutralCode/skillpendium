import React from "react";
import {
  Switch,
  Route,
  HashRouter
} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";

export default function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path={['/:skillId', '/']}>
          <Home />
        </Route>
      </Switch>
    </HashRouter>
  );
}

