const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8085 });

server.on('connection', (socket) => {
  console.log('Yangi mijoz ulandi');
  
  // Mijozdan xabar olganda:
  socket.on('message', (message) => {
    console.log(`Xabar olindi: ${message}`);
    
    // Barcha mijozlarga yuborish:
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Aloqa uzilganda:
  socket.on('close', () => {
    console.log('Mijoz ulandi');
  });
});

console.log('Server 8085 portida ishlamoqda...');
