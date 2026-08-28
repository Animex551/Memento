import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alarm } from '../components/Alarm.jsx';
import { Plus } from 'lucide-react';
import { AlarmService } from '../services/alarmService';
import api from '../services/api';

export function Home() {
  const [alarms, setAlarms] = useState([]);

  // Cargar alarmas desde Express al entrar a la pantalla
  useEffect(() => {
    fetchAlarms();
  }, []);

  const fetchAlarms = async () => {
    try {
      const response = await api.get('/alarms');
      setAlarms(response.data);
    } catch (error) {
      console.error('Error al obtener alarmas de la API:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // 1. Cancelar en el SO del teléfono
      await AlarmService.cancelAlarm(id);
      
      // 2. Eliminar en el Servidor Express
      await api.delete(`/alarms/${id}`);
      
      // 3. Actualizar la vista local
      setAlarms(alarms.filter((alarm) => alarm.id !== id));
    } catch (error) {
      console.error('Error al eliminar alarma:', error);
    }
  };

  return (
    <div className="page-container">
      <header className="header">
        <h1>Mis Alarmas</h1>
        <Link to="/crear" className="btn-add">
          <Plus /> Nueva
        </Link>
      </header>

      <main className="alarm-list">
        {alarms.length === 0 ? (
          <p>No tienes alarmas configuradas.</p>
        ) : (
          alarms.map((alarm) => (
            <Alarm key={alarm.id} alarm={alarm} onDelete={handleDelete} />
          ))
        )}
      </main>
    </div>
  );
}