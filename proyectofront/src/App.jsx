import { useEffect, useState } from "react";

const styles = {
  ul: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "32px",
  },
  li: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #ccc",
    cursor: "pointer",
    flexDirection: "column",
    textAlign: "center",
  },
  img: {
    width: "150px",
    height: "225px",
    marginRight: "10px",
    borderRadius: "5px",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
  },
};

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [peliculaActual, setPeliculaActual] = useState({
    title: "",
    imageurl: "",
  });
  const [search, setSearch] = useState("");

  const filteredMovies = peliculas.filter((movie) =>
    movie.title.startsWith(search)
  );

  useEffect(() => {
    fetch("http://localhost:3000/peliculas")
      .then((response) => response.json())
      .then((data) => setPeliculas(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/peliculas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: peliculaActual.title,
        imageurl: peliculaActual.imageurl,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPeliculas([...peliculas, data]);
        setPeliculaActual({ title: "", imageurl: "" });
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          onChange={(e) =>
            setPeliculaActual({ ...peliculaActual, title: e.target.value })
          }
          placeholder="Titulo de la pelicula"
        />
        <input
          type="text"
          name="imageurl"
          onChange={(e) =>
            setPeliculaActual({ ...peliculaActual, imageurl: e.target.value })
          }
          placeholder="URL de la imagen"
        />
        <button type="submit">Añadir pelicula</button>
      </form>
      <h1>Listado de pelis</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar peli "
      />
      <ul style={styles.ul}>
        {filteredMovies.map((movie) => (
          <li style={styles.li} key={movie.id}>
            <img style={styles.img} src={movie.imageurl} alt={movie.title} />
            <span style={styles.title}>{movie.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
