import express from "express";
import cors from "cors";
import { pool } from "./database/db.js";

const app = express();

const port = 3000;
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("hola");
});

app.get("/peliculas", async (req, res) => {
  const response = await pool.query("SELECT * FROM peliculas ORDER BY id ASC");
  res.status(200).json(response.rows);
});

app.post("/peliculas", async (req, res) => {
  try {
    const { title, imageurl } = req.body;

    const { rows } = await pool.query(
      "INSERT INTO peliculas (title, imageurl) VALUES ($1, $2) RETURNING *",
      [title, imageurl]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
});