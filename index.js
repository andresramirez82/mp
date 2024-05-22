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
const PORT = process.env.PORT || 5001;

const activeUsers = {}; // Objeto para almacenar usuarios activos


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

app.post('/list', (req, res) => {
  // Procesar la notificación según tus necesidades
 
  // Enviar la notificación a través del WebSocket
  io.emit('list', {
    datef: '2024-05-10T03:00:00.000Z',
    dates: '2024-05-25'
  });

  // Responder a la solicitud de Mercado Pago con un código 200 para confirmar la recepción de la notificación
  res.status(200).send('List ');
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
  console.log('Un usuario se ha conectado');

  // Añadir el nuevo usuario a la lista de usuarios activos
  socket.on('user connected', (username) => {
      activeUsers[username] = socket.id;
  });

  socket.on('List Return', (carts) => {
    console.log(carts)
});

    
  // Manejar la desconexión del usuario
  socket.on('disconnect', () => {
      console.log('Un usuario se ha desconectado');
      delete activeUsers[socket.id]; // Eliminar el usuario de la lista de activos
      io.emit('active users', Object.values(activeUsers)); // Enviar la lista actualizada a todos
  });

});