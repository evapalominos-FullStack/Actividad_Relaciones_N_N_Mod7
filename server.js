require('dotenv').config();
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. CONEXIÓN
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false
});

// 2. MODELOS
const Pelicula = sequelize.define('Pelicula', {
  titulo: DataTypes.STRING,
  anio: DataTypes.INTEGER
}, { tableName: 'peliculas', timestamps: false });

const Actor = sequelize.define('Actor', {
  nombre: DataTypes.STRING,
  fecha_nacimiento: DataTypes.DATEONLY
}, { tableName: 'actores', timestamps: false });

const PeliculasActores = sequelize.define('PeliculasActores', {}, { tableName: 'peliculas_actores', timestamps: false });

Pelicula.belongsToMany(Actor, { through: PeliculasActores, foreignKey: 'pelicula_id' });
Actor.belongsToMany(Pelicula, { through: PeliculasActores, foreignKey: 'actor_id' });


app.get('/test', (req, res) => res.send('¡Servidor Reconocido!'));

// Listar todo
app.get('/peliculas', async (req, res) => res.json(await Pelicula.findAll({ include: Actor })));
app.get('/actores', async (req, res) => res.json(await Actor.findAll({ include: Pelicula })));

// Crear Película
app.post('/peliculas', async (req, res) => res.json(await Pelicula.create(req.body)));

// Crear Actor 
app.post('/actores', async (req, res) => {
    try {
        const nuevo = await Actor.create(req.body);
        res.status(201).json(nuevo);
    } catch (e) { res.status(400).send(e.message); }
});

// Asignar (La Transacción)
app.post('/asignar-actor', async (req, res) => {
    const { pelicula_id, actor_id } = req.body;
    try {
        await sequelize.transaction(async (t) => {
            await PeliculasActores.create({ pelicula_id, actor_id }, { transaction: t });
        });
        res.send('Asignación exitosa');
    } catch (e) { res.status(400).send(e.message); }
});

// ARRANQUE
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`>>> SERVIDOR CORRIENDO EN PORT ${PORT} <<<`));
}).catch(err => console.log('ERROR DB:', err));
