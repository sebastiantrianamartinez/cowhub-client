const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8099;

app.use(cors({
  origin: [
    'http://localhost:8096',
    'http://localhost:8021',
    'http://localhost:8021',
    'http://127.0.0.1:8021',
    'http://127.0.0.1',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

// Configurar proxy para redirigir solicitudes a '/api'
const proxy = httpProxy.createProxyServer({});
app.use('/api', (req, res) => {
  proxy.web(req, res, { target: 'http://localhost:8021' }, (err) => {
    console.error(err);
    res.status(500).send('Proxy error');
  });
});

// Servir archivos estáticos desde el directorio 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Ruta para manejar todas las demás solicitudes y servir 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
