import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path={['/:skillId', '/']}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

