import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Genres from "./components/Genres";
import NewGenre from "./components/NewGenre";
import EditGenre from "./components/EditGenre";
import Series from "./components/Series";
import NewSerie from "./components/NewSerie";
import InfoSerie from "./components/InfoSerie";

const Home = () => {
  return <h1>Home</h1>;
};

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/genres" exact component={Genres} />
          <Route path="/genres/new" exact component={NewGenre} />
          <Route path="/genres/:id" exact component={EditGenre} />
          <Route path="/series" exact component={Series} />
          <Route path="/series/new" exact component={NewSerie} />
          <Route path="/series/:id" exact component={InfoSerie} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
