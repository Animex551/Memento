import { LocalNotifications } from '@capacitor/local-notifications';

export const AlarmService = {
  // Solicitar permisos al SO del teléfono para mostrar notificaciones
  requestPermissions: async () => {
    const status = await LocalNotifications.requestPermissions();
    return status.display === 'granted';
  },

  // Programar una alarma nativa a una hora específica
  scheduleAlarm: async (id, title, body, alarmTime) => {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: title,
          body: body,
          id: id,
          schedule: { at: new Date(alarmTime) },
          sound: 'alarm_sound.wav', // Opcional: sonido personalizado
          actionTypeId: '',
          extra: null
        }
      ]
    });
  },

  // Cancelar una alarma específica programada
  cancelAlarm: async (id) => {
    await LocalNotifications.cancel({ notifications: [{ id: id }] });
  }
};