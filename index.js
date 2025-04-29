const express = require('express');

const http = require('http');

const socketIO = require('socket.io'); 

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

const ejs = require('ejs');

const path = require('path')

app.use(express.static(path.join(__dirname, 'public')));

app.set('view', path.join(__dirname, 'public'));

app.engine('html', ejs.renderFile);

app.use('/', (req, res)=>{
    res.render('index.html')
});

// ########### logica do socket.io - envio e progamação de mensagem //
let messsage = [];
 
// estrutura de conexão do socket.io //
io.on('connection', socket => {

// TESTE DE CONECTION 
    console.log('NOVO USUARIO CONECTADO' + socket.id)

// REcupera e mantém (exibe) as menssagens entre o front eo back
socket.emit('previousMessagem', messages);

// logica de chat quando uma menssagem e enviada :
socket.on('sendMessage' data=>{

    //adiciona a mensagem no final do array de mensagens
    messages.push(data);

    socket.bradcast.emit('receivedMessage', data);
});

});

server.listen(3000, ()=>{
    console.log('Whystzap rodando - http://localhost:3000')

});

const favelados_volei_real_cria_rock_and = 6 //Vitor e Kauan valem por 2