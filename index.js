const express = require('express');

const socketIO = require('socket.io');

const http = require('http');

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

const ejs = require('ejs');

const path = require('path');

const { emit } = require('process');

app.use(express.static(path.join(__dirname, 'public')));
// console.log(path.join(__dirname, 'public'));

app.set('view', path.join(__dirname, 'public'));

app.engine('html', ejs.renderFile);

app.use('/', (req, res)=>{
    res.render('index.html');
});

/**/

//array que simula o banco de dados
let messages = [];

io.on('connection', socket => {
    console.log('NOVO USUÁRIO CONECTADO: ' + socket.id);

    //Recupera e mantém (exibe) as mensagens entre front e back:
    socket.emit('previousMessage', messages);

    //Lógica de chat quando uma mensagem e enviada:
    socket.on('sendMessage', data => {
        //adiciona a mensagem no final do array de mensagens:
        messages.push(data);

        socket.broadcast.emit('receivedMessage', data);

        console.log('Quantidade De Mensagens: ' + messages.length);

    });

    console.log('Quantidade De Mensagens: ' + messages.length);

});

server.listen(3000, ()=>{
    console.log('CHAT RODANDO EM - http://localhost:3000');
});