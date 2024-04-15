import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { json } from '../../server/core/db/sequelize';

async function fetchData() {
  try {
    console.log('Enviando solicitud al servidor...');
    const response = await fetch('http://localhost:8099/api/bugs');
    console.log('Respuesta recibida del servidor:', response);
    const data = await response.json();
    console.log('Datos recibidos:', data);
    
    if (response.ok) {
      console.log('Datos válidos recibidos. Representando en la interfaz de usuario...');
      ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
          <h1>{JSON.stringify(data)}</h1>
        </React.StrictMode>
      );
    } else {
      console.error('Error fetching data:', response.status, response.statusText);
    }
    
  } catch (error) {
    console.error('Error al obtener datos:', error);
  }
}


console.log('Iniciando solicitud de datos...');
fetchData();
