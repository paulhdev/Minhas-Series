import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const EditGenre = ({ match }) => {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get(`/api/genres/${match.params.id}`).then(res => {
      setName(res.data.name);
    });
  }, [match.params.id]);

  const onChange = e => {
    setName(e.target.value);
  };

  const save = () => {
    axios
      .put(`/api/genres/${match.params.id}`, {
        name
      })
      .then(res => {
        setSuccess(true);
      });
  };

  if (success) {
    return <Redirect to="/genres" />;
  }

  return (
    <div className="container">
      <h1>Editar Gênero</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Nome do Gênero"
            value={name}
            onChange={onChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={save}>
          Salvar
        </button>
      </form>
    </div>
  );
};

export default EditGenre;
