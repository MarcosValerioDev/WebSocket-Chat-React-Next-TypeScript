import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (socket) => {
  console.log('Novo cliente conectado!');

  // Quando receber mensagem do cliente
  socket.on('message', (message) => {
    console.log(`Mensagem recebida: ${message}`);

    // Enviar de volta para todos os clientes conectados
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Eco: ${message}`);
      }
    });
  });

  // Quando o cliente desconectar
  socket.on('close', () => {
    console.log('Cliente desconectado');
  });
});

console.log('Servidor WebSocket rodando na porta 8080');