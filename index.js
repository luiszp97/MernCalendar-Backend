const express = require('express');
require('dotenv').config();
const cors = require('cors')
const { dbConection } = require('./database/config')

//! Crear el server de express

const app = express();

//! Base de Datos

dbConection();

//! Cors

app.use(cors())

//! Directorio publico

app.use( express.static('public') );

//! Lectura y Parse del body

app.use( express.json() )

//! Rutas

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


// TODO: CRUD: Eventos
 
//! Escuchar peticiones

app.listen( process.env.PORT, ()=>{

    console.log(`servidor corriendo en el puerto ${ process.env.PORT }`);

} )