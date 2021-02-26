import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from './components/HomePage/HomePage';
import DetailPage from './components/DetailPage/DetailPage';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <Router >
      <NavBar />
      <Switch>
        <Route exact path="/" component={(HomePage)} />
        <Route exact path="/details/:id" component={(DetailPage)} />
      </Switch>
    </Router>
  );
}

export default App;
