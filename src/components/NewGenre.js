import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const NewGenre = () => {

  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)

  const onChange = e => {
    setName(e.target.value)
  }

  const save = () => {
    axios.post('/api/genres', {
      name
    })
    .then(res => {
      setSuccess(true)
      console.log(res.data)
    })
  }

  if(success) {
    return <Redirect to="/genres" />
  }

  return (
    <div className="container">
      <h1>Novo Gênero</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input type="text" className="form-control" id="name" placeholder="Nome do Gênero"
          value={name}
          onChange={onChange} />
        </div>
        <button type="button" className="btn btn-primary" onClick={save}>Salvar</button>
      </form>
    </div>
  )
}

export default NewGenre;