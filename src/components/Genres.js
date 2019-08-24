import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

const Genres = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('/api/genres')
      .then(res => {
        setData(res.data.data)
      })
  }, [])

  const deleteGenre = id => {
    axios.delete(`/api/genres/${id}`)
    .then(res => {
      const filterGenres = data.filter(item => item.id !== id)
      setData(filterGenres)
    })
  }

  const renderRow = record => {
    return (
      <tr key={record.id}>
        <th scope="row">{record.id}</th>
        <td>{record.name}</td>
        <td>
          <button onClick={() => deleteGenre(record.id)} className="btn btn-danger">Remover</button>
          <Link to={`/genres/${record.id}`}
          className="btn btn-warning ml-2">Editar</Link>
        </td>
      </tr>
    )
  }

  if(data.length === 0) {
    return (
      <div className="container">
        <h1>Gêneros</h1>
        <Link to='/genres/new' className="btn btn-primary mb-2">Novo Gênero</Link>
        <div className="alert alert-warning" role="alert">
          Você não possui gêneros criados!
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Gêneros</h1>
      <Link to='/genres/new' className="btn btn-primary mb-2">Novo Gênero</Link>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(renderRow)}
        </tbody>
      </table>
    </div>
  );
};

export default Genres;