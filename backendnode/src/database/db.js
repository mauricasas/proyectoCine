import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new pg.Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
});

const crearTablaPeliculas = async () => {
    const consulta = `
      CREATE TABLE IF NOT EXISTS peliculas (
        id SERIAL PRIMARY KEY,
        title VARCHAR(50) NOT NULL,
        imageurl VARCHAR(255) NOT NULL
      );
    `;

    try {
        await pool.query(consulta);
        console.log('Tabla creada con éxito');
    } catch (error) {
        console.error('Error al crear la tabla:', error);
    }
};

crearTablaPeliculas();