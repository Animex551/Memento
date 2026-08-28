import { Trash2, Clock } from 'lucide-react';

export function Alarm({ alarm, onDelete }) {
  return (
    <div className="alarm-card">
      <div className="alarm-info">
        <Clock size={20} />
        <div>
          <h3>{alarm.time}</h3>
          <p>{alarm.title}</p>
        </div>
      </div>
      <button onClick={() => onDelete(alarm.id)} className="btn-delete">
        <Trash2 size={18} />
      </button>
    </div>
  );
}