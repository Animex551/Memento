import axios from 'axios';
import { Capacitor } from '@capacitor/core';

// En PC usas localhost. En dispositivo o emulador debes usar la IP de tu red local
const BASE_URL = Capacitor.isNativePlatform()
  ? 'http://192.168.1.50:3000/api' // Reemplaza por la IP local de tu computador
  : 'http://localhost:3000/api';

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;