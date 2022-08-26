let asesino = ["MUERTE", "MATAR", "ASESINAR","ASESINEN", "MUERTO"]
var conteo = 0
const db = require ('./db');
const model= require("./model");
const express = require('express');
const http = require('http');
const app = express();

const server = http.createServer(app);
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

//Creamos el socket del servidor y le agregamos la dependencia del dashboard
const io = new Server(server, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true
  }
});

instrument(io, {
  auth: false
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/monitor',(req,res)=>{
  res.sendFile(__dirname +'/monitor.html')
})

//Metodos del socket del lado del servidor
io.on('connection', (socket) => {
  
  console.log('Un cliente conectado '+socket.id);
  conteo++;
  io.emit('contador', conteo);
  
  socket.on('disconnect', () => {
    console.log('Cliente desconectado '+socket.id);
    conteo--
    io.emit('contador', conteo);
  });

  socket.on('mensaje', (msg) => {
    
    const mensaje1= new model ({
      id_cliente:socket.id,
      mensaje:msg
  
    })
    mensaje1.save().then(result=>{
      console.log('note saved')
    })

    //guerdar mensaje
    //buscar si existe palabra calve
    texto = msg.toUpperCase()
    //met.insertdata(msg)
    for (let x of asesino) {
      if(texto.search(x)>-1){
        console.log("El cliente "+socket.id+" dijo que " + x)
        io.emit("espionaje","El cliente "+socket.id+" dijo: " +msg)
      }
    }

    io.emit('mensaje',"El cliente "+socket.id+" dijo que: " +msg);
  });
});

server.listen(3000, () => {
  console.log('Escuchando por el puerto:3000');
});
db()


