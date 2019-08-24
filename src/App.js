import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import axios from 'axios';

import Header from "./components/Header";
import Genres from './components/Genres';
import NewGenre from './components/NewGenre';
import EditGenre from './components/EditGenre';

const Home = () => {
  return <h1>Home</h1>;
};

const Series = () => {
  return <h1>Séries</h1>
}

function App() {
  const [data, setData] = useState({})
  useEffect(() => {
    axios.get('/api').then(res => {
      setData(res.data)
    })
  }, [])

  return (
    <Router>
      <div>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/genres" exact component={Genres} />
        <Route path="/genres/new" exact component={NewGenre} />
        <Route path="/genres/:id" exact component={EditGenre} />
        <Route path="/series" component={Series} />
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>
  );
}

export default App;
