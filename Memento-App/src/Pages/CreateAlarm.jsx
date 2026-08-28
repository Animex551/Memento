import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlarmService } from '../services/alarmService';
import { ArrowLeft, Save } from 'lucide-react';
import api from '../services/api';

export function CreateAlarm() {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!time || !title) return;

    try {
      // 1. Guardar la alarma en el servidor Express
      const response = await api.post('/alarms', { title, time });
      const savedAlarm = response.data;

      // 2. Calcular fecha para la notificación nativa
      const [hours, minutes] = time.split(':');
      const alarmDate = new Date();
      alarmDate.setHours(parseInt(hours, 10));
      alarmDate.setMinutes(parseInt(minutes, 10));
      alarmDate.setSeconds(0);
      if (alarmDate < new Date()) alarmDate.setDate(alarmDate.getDate() + 1);

      // 3. Programar en el dispositivo usando el ID devuelto por la API
      await AlarmService.scheduleAlarm(savedAlarm.id, savedAlarm.title, '¡Alarma!', alarmDate);

      navigate('/');
    } catch (error) {
      console.error('Error al conectar con la API:', error);
    }
  };

  return (
    <div className="page-container">
      <button onClick={() => navigate('/')} className="btn-back">
        <ArrowLeft size={20} /> Volver
      </button>

      <h2>Crear Nueva Alarma</h2>

      <form onSubmit={handleSubmit} className="alarm-form">
        <div className="form-group">
          <label>Nombre de la alarma</label>
          <input 
            type="text" 
            placeholder="Ej. Tomar medicamento" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Hora</label>
          <input 
            type="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
            required 
          />
        </div>

        <button type="submit" className="btn-submit">
          <Save size={18} /> Guardar Alarma
        </button>
      </form>
    </div>
  );
}