const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: false
    }
  });
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint para recibir notificaciones de Mercado Pago
app.post('/webhook', (req, res) => {
  // Procesar la notificación según tus necesidades
  console.log('Received notification from Mercado Pago:');
  console.log(req.body);

  // Procesar la notificación y tomar acciones en consecuencia
  processNotification(req.body);

  // Enviar la notificación a través del WebSocket
  io.emit('notification', req.body);

  // Responder a la solicitud de Mercado Pago con un código 200 para confirmar la recepción de la notificación
  res.status(200).send('Notification received');
});

// Función para procesar la notificación recibida del webhook
function processNotification(notification) {
  // Aquí puedes escribir la lógica para procesar la notificación y tomar acciones en consecuencia
  console.log('Processing notification...');
}

// Iniciar el servidor
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Configurar el WebSocket
io.on('connection', (socket) => {
  console.log('Client connected');
});