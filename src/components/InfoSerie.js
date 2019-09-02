import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Badge } from "reactstrap";
import axios from "axios";

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({});
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState("INFO");
  const [genres, setGenres] = useState([]);

  const [data, setData] = useState({});

  useEffect(() => {
    axios.get(`/api/series/${match.params.id}`).then(res => {
      setData(res.data);
      setForm(res.data);
    });
  }, [match.params.id]);

  useEffect(() => {
    axios.get("/api/genres").then(res => {
      setGenres(res.data.data);
    });
  }, []);

  // custom header
  const masterHeader = {
    height: "50vh",
    minHeight: "500px",
    backgroundImage: `url('${data.background}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  };

  const onChange = field => e => {
    setForm({
      ...form,
      [field]: e.target.value
    });
  };

  const save = () => {
    axios
      .put(`/api/series/${match.params.id}`, form)
      .then(res => {
        setSuccess(true);
      });
  };

  if (success) {
    return <Redirect to="/series" />;
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className="h-100" style={{ background: "rgba(0,0,0,.7)" }}>
          <div className="h-100 container">
            <div className="row h-100 align-items-center">
              <div className="col-3">
                <img
                  src={data.poster}
                  alt={data.name}
                  className="img-fluid img-thumbnail"
                />
              </div>
              <div className="col-9">
                <h1
                  className="font-weight-light text-white
                "
                >
                  {data.name}
                </h1>
                <div className="lead text-white">
                  <Badge color="success">Assistido</Badge>
                  <Badge color="warning">Para assistir</Badge>
                  Gênero: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div>
        <button
          onClick={() => setMode("EDIT")}
          className="btn btn-primary mt-2 ml-2"
        >
          Editar
        </button>
      </div>
      {mode === "EDIT" && (
        <div className="container">
          <h1>Nova Série</h1>
          <pre>{JSON.stringify(form)}</pre>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Nome da Série"
                value={form.name}
                onChange={onChange("name")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="comments">Comentários:</label>
              <input
                type="text"
                className="form-control"
                id="comments"
                placeholder="Comentário sobre a série"
                value={form.comments}
                onChange={onChange("comments")}
              />
            </div>
            <div className="form-group">
              <label for="exampleFormControlSelect1">Gênero</label>
              <select className="form-control" onChange={onChange("genre_id")}>
                {genres.map(genre => (
                  <option
                    key={genre.id}
                    value={genre.id}
                    select={genre.id === form.genre}
                  >
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="button" className="btn btn-primary" onClick={save}>
              Salvar
            </button>
            <button
              onClick={() => setMode("INFO")}
              className="btn btn-danger ml-2"
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default InfoSerie;
