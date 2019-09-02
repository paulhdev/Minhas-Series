import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Series = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("/api/series").then(res => {
      setData(res.data.data);
    });
  }, []);

  const deleteSerie = id => {
    axios.delete(`/api/series/${id}`).then(res => {
      const filterGenres = data.filter(item => item.id !== id);
      setData(filterGenres);
    });
  };

  const renderRow = record => {
    return (
      <tr key={record.id}>
        <th scope="row">{record.id}</th>
        <td>{record.name}</td>
        <td>
          <button
            onClick={() => deleteSerie(record.id)}
            className="btn btn-danger"
          >
            Remover
          </button>
          <Link to={`/series/${record.id}`} className="btn btn-warning ml-2">
            Info
          </Link>
        </td>
      </tr>
    );
  };

  if (data.length === 0) {
    return (
      <div className="container">
        <h1>Séries</h1>
        <Link to="/series/new" className="btn btn-primary mb-2">
          Nova Série
        </Link>
        <div className="alert alert-warning" role="alert">
          Você não possui nenhuma série!
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Série</h1>
      <Link to="/series/new" className="btn btn-primary mb-2">
        Nova Série
      </Link>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>{data.map(renderRow)}</tbody>
      </table>
    </div>
  );
};

export default Series;
