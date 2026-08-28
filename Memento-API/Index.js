const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite peticiones desde React / Android
app.use(express.json()); // Permite leer el cuerpo de las peticiones en JSON

// Base de datos temporal en memoria (sustituir más adelante por PostgreSQL)
let alarms = [];

// Rutas de la API
// 1. Obtener todas las alarmas
app.get('/api/alarms', (req, res) => {
  res.json(alarms);
});

// 2. Crear una nueva alarma
app.post('/api/alarms', (req, res) => {
  const { title, time } = req.body;
  
  if (!title || !time) {
    return res.status(400).json({ error: 'Título y hora son requeridos' });
  }

  const newAlarm = {
    id: Date.now(),
    title,
    time,
    createdAt: new Date()
  };

  alarms.push(newAlarm);
  res.status(201).json(newAlarm);
});

// 3. Eliminar una alarma por ID
app.delete('/api/alarms/:id', (req, res) => {
  const { id } = req.params;
  alarms = alarms.filter((alarm) => alarm.id !== Number(id));
  res.json({ message: 'Alarma eliminada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});