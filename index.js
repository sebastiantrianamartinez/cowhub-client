const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');

const app = express();
const port = process.env.PORT || 8099;

// Configurar proxy para redirigir solicitudes a '/api'
const proxy = httpProxy.createProxyServer();
app.use('/api', (req, res) => {
  proxy.web(req, res, { target: 'http://localhost:8021' });
});

// Servir archivos estáticos desde el directorio 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Ruta para manejar todas las demás solicitudes y servir 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
